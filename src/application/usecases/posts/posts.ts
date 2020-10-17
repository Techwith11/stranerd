import { computed, reactive, watch } from '@vue/composition-api'
import { PostEntity } from '@modules/posts/domain/entities/post'
import { GetPosts, FindPost, ListenToPosts, GetPostFactory, AddPost } from '@modules/posts/'
import router from '@application/router'
import { Notify } from '@application/config/notifications'
import { fetchUser } from '@application/usecases/users/users'
import { UserEntity } from '@modules/users/domain/entities/user'
import { useStore } from '@application/usecases/store'
import { saveIntendedRoute } from '@/usecases/core/router'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
const globalState = reactive({
	posts: reactive([]) as PostEntity[],
	fetched: false,
	loading: false,
	error: '',
	hasMore: false,
	olderPostsLoading: false,
	listener: () => {}
})

const setPost = (post: PostEntity) => {
	const index = globalState.posts.findIndex((p) => p.id === post.id)
	if(index !== -1) globalState.posts.splice(index, 1, post)
	else globalState.posts.push(post)
}
const unshiftPost = (post: PostEntity) => {
	const index = globalState.posts.findIndex((p) => p.id === post.id)
	if(index !== -1) globalState.posts.splice(index, 1, post)
	else globalState.posts.unshift(post)
}
const fetchPosts = async () => {
	const date = globalState.posts[globalState.posts.length - 1]?.createdAt ?? undefined
	const entities = await GetPosts.call(date)
	globalState.hasMore = entities.length === PAGINATION_LIMIT + 1
	entities.slice(0, PAGINATION_LIMIT).forEach(setPost)
}
const startListener = async () => {
	const date = globalState.posts[0]?.createdAt ?? undefined
	const appendPosts = (newPosts: PostEntity[]) => { newPosts.map(unshiftPost) }
	globalState.listener = await ListenToPosts.call(appendPosts, date)
}
const fetchPostsOnInitAndSetListener = async () => {
	globalState.loading = true
	await fetchPosts().catch(() => globalState.error = 'Failed to fetch posts')
	if(globalState.posts.length === 0) globalState.error = 'No posts available at the moment. Check again later'
	await startListener().catch(() => globalState.error = 'Failed to start listeners')
	globalState.loading = false
}
const fetchOlderPosts = async () => {
	globalState.olderPostsLoading = true
	await fetchPosts()
	globalState.olderPostsLoading = true
}

export const usePostsList = () => {
	if(!globalState.fetched) fetchPostsOnInitAndSetListener().then(() => globalState.fetched = true)

	return {
		loading: computed(() => globalState.loading),
		olderPostsLoading: computed(() => globalState.olderPostsLoading),
		hasMore: computed(() => globalState.hasMore),
		error: computed(() => globalState.error),

		posts: computed(() => globalState.posts),

		fetchOlderPosts
	}
}

export const useRecentPostsList = () => {
	if(!globalState.fetched) fetchPostsOnInitAndSetListener().then(() => globalState.fetched = true)

	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),

		posts: computed(() => globalState.posts.slice(0,2)),
	}
}

const fetchPost = async (id: string) => {
	let post = globalState.posts.find((post) => post.id === id)
	if(post) return post
	post = await FindPost.call(id)
	if(post) unshiftPost(post)
	return post
}

export const usePost = (id: string) => {
	const state = reactive({
		loading: false,
		post: undefined as PostEntity | undefined,
		user: undefined as UserEntity | undefined,
		error: ''
	})
	const findPost = async () => {
		state.loading = true
		const post = await fetchPost(id)
		if(post) {
			state.post = post
			state.user = await fetchUser(post.userId)
		}
		else{
			await router.replace('/posts')
			await Notify({ title: 'No such post found', icon: 'error' })
		}
		state.loading = false
	}
	findPost().catch(() => state.error = 'Failed to fetch post')
	return {
		loading: computed(() => state.loading),
		post: computed(() => state.post),
		user: computed(() => state.user),
		error: computed(() => state.error)
	}
}

const factory = GetPostFactory.call()
export const useCreatePost = () => {
	const state = reactive({
		loading: false,
		factory
	})

	state.factory.userId = useStore().auth.getId.value
	watch(() => useStore().auth.getId.value, () => {
		state.factory.userId = useStore().auth.getId.value
	})

	const createPost = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			if(useStore().auth.questionsLeft.value > 0){
				try{
					const id = await AddPost.call(state.factory)
					state.factory.reset()
					await router.push(`/posts/${id}`)
				}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			}else await useStore().modals.setPostModalNotify()
			state.loading = false
		}else state.factory.validateAll()
	}

	watch(() => useStore().auth.getId, () => state.factory.userId = useStore().auth.getId.value)
	const login = async () => {
		saveIntendedRoute('/ask-a-question')
		await router.push('/auth/signin')
	}

	return {
		factory: state.factory,

		isLoggedIn: useStore().auth.isLoggedIn,
		loading: computed(() => state.loading),

		createPost, login,
	}
}
