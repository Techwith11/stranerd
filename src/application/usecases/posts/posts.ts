import { computed, reactive, ref, watch } from '@vue/composition-api'
import { PostEntity } from '@root/modules/posts/domain/entities/post'
import { GetPosts, FindPost, ListenToPosts, GetPostFactory, AddPost } from '@root/modules/posts/'
import router from '@/router'
import { Notify } from '@/config/notifications'
import { fetchUser } from '@/usecases/users/users'
import store from '@/store'
import { UserEntity } from '@root/modules/users/domain/entities/user'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
const posts: PostEntity[] = reactive([])
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
    const index = globalState.posts.findIndex(p => p.id === post.id)
    if(index !== -1) globalState.posts[index] = post
    else globalState.posts.push(post)
}
const unshiftPost = (post: PostEntity) => {
    const index = globalState.posts.findIndex(p => p.id === post.id)
    if(index !== -1) globalState.posts[index] = post
    else globalState.posts.unshift(post)
}
const fetchPosts = async () => {
    const date = globalState.posts[0]?.createdAt ?? undefined
    const entities = await GetPosts.call(date)
    globalState.hasMore = entities.length === PAGINATION_LIMIT
    entities.forEach(setPost)
}
const startListener = async () => {
    const date = globalState.posts[0]?.createdAt ?? undefined
    const appendPosts = (newPosts: PostEntity[]) => { newPosts.map(unshiftPost) }
    globalState.listener = await ListenToPosts.call(appendPosts, date)
}
const endListener = () => globalState.listener()
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
    let post = globalState.posts.find(post => post.id === id)
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
            await router.push('/posts')
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

    const tag = ref('')
    const splitTag = () => {
        if(tag.value.includes(' ')){
            tag.value.split(' ').map(tag => {
                if(tag) factory.addTag(tag.toLowerCase())
            })
            tag.value = ''
        }
    }
    watch(() => tag.value, splitTag)
    const removeTag = (tag: string) => factory.removeTag(tag)

    state.factory.userId = store.getters.getId

    const createPost = async () => {
        if(state.factory.valid && !state.loading){
            state.loading = true
            state.factory.userId = store.getters.getId
            if(store.getters.questionsLeft){
                try{
                    const id = await AddPost.call(state.factory)
                    state.factory.reset()
                    await router.push(`/posts/${id}`)
                }catch(error){ await Notify({ icon: 'error', title: error.message }) }
            }else await store.dispatch('setPostModalNotify')
            state.loading = false
        }else state.factory.validateAll()
    }

    watch(() => store.getters.getId, () => state.factory.userId = store.getters.getId)
    const login = async () => {
        await store.dispatch('setAuthModalLogin')
        await router.push('/ask-a-question')
    }

    return {
        factory: state.factory,
        tag, splitTag, removeTag,

        isLoggedIn: computed(() => store.getters.isLoggedIn),
        loading: computed(() => state.loading),

        createPost, login,

        subjects: computed(() => store.getters.getAllSubjects),
        modules: computed(() => store.getters.getAllSubjects.find((s: {name: string, modules: object[]}) => s.name === state.factory.subject)?.modules ?? [])
    }
}
