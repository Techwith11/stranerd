import { FirestoreService, FunctionsService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { PostBaseDataSource } from '@modules/posts/data/datasources/post-base'
import { PostFromModel, PostToModel } from '@modules/posts/data/models/post'

export class PostFirebaseDataSource implements PostBaseDataSource{

	public async create(post: PostToModel): Promise<string> {
		return await FunctionsService.call('createPost', { post }) as string
	}

	public async find(id: string): Promise<PostFromModel | undefined> {
		return await FirestoreService.find('posts', id) as PostFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<PostFromModel[]> {
		return await FirestoreService.get('posts',conditions) as PostFromModel[]
	}

	public async listen(callback: (documents: PostFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		return await FirestoreService.listen(callback, 'posts', conditions)
	}

}
