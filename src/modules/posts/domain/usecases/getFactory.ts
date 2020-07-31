import PostFactory from '@root/modules/posts/domain/factories/post'

export default () => {
    return () : PostFactory => {
        return new PostFactory()
    }
}
