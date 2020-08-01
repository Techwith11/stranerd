import { computed, reactive } from '@vue/composition-api'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { GetPosts, FindPost, ListenToPosts } from '@root/modules/posts/'

const PAGINATION_LIMIT = 24
const posts: PostEntity[] = reactive([])

export const usePostsList = () => {
    const state = reactive({
        loading: false,
        hasMore: true,
        error: '',
        olderPostsLoading: false,
        listener: () => {}
    })

    const setPost = (post: PostEntity) => {
        const index = posts.findIndex(p => p.id === post.id)
        if(index !== -1) posts[index] = post
        else posts.push(post)
    }
    const unshiftPost = (post: PostEntity) => {
        const index = posts.findIndex(p => p.id === post.id)
        if(index !== -1) posts[index] = post
        else posts.unshift(post)
    }
    const fetchPosts = async () => {
        const date = posts[0]?.createdAt ?? undefined
        const entities = await GetPosts.call(date)
        state.hasMore = entities.length === PAGINATION_LIMIT
        entities.forEach(setPost)
    }
    const startListener = async () => {
        const date = posts[0]?.createdAt ?? undefined
        const appendPosts = (newPosts: PostEntity[]) => { newPosts.map(unshiftPost) }
        state.listener = await ListenToPosts.call(appendPosts, date)
    }
    const endListener = () => state.listener()
    const fetchPostsOnInitAndSetListener = async () => {
        state.loading = true
        await fetchPosts()
        if(posts.length === 0) state.error = 'No posts available at the moment. Check again later'
        await startListener()
        state.loading = false
    }
    const fetchOlderPosts = async () => {
        state.olderPostsLoading = true
        await fetchPosts()
        state.olderPostsLoading = true
    }

    fetchPostsOnInitAndSetListener().catch(() => state.error = 'Failed to fetch posts and start listeners')

    return {
        loading: computed(() => state.loading),
        olderPostsLoading: computed(() => state.olderPostsLoading),
        hasMore: computed(() => state.hasMore),
        error: computed(() => state.error),

        posts,

        fetchOlderPosts,
        startListener,
        endListener
    }
}

export const usePost = (id: string) => {
    const state = reactive({
        loading: false,
        post: undefined as PostEntity | undefined,
        error: undefined as string | undefined
    })
    const findPost = async () => {
        state.loading = true
        let post = posts.find(post => post.id === id)
        if(post) state.post = post
        else{
            post = await FindPost.call(id)
            if(post) state.post = post
            else state.error = 'No post with such id found'
        }
        state.loading = false
    }
    findPost()
    return {
        loading: computed(() => state.loading),
        post: computed(() => state.post),
        error: computed(() => state.error)
    }
}
