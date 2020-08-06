import { computed, reactive } from '@vue/composition-api'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { GetPosts, FindPost, ListenToPosts, GetRecentPosts } from '@root/modules/posts/'

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

export const usePost = (id: string) => {
    const state = reactive({
        loading: false,
        post: undefined as PostEntity | undefined,
        error: undefined as string | undefined
    })
    const findPost = async () => {
        state.loading = true
        let post = globalState.posts.find(post => post.id === id)
        if(post) state.post = post
        else{
            post = await FindPost.call(id)
            if(post) state.post = post
            else state.error = 'No post with such id found'
        }
        state.loading = false
    }
    findPost().catch(() => state.error = 'Failed to fetch post')
    return {
        loading: computed(() => state.loading),
        post: computed(() => state.post),
        error: computed(() => state.error)
    }
}
