import { DatabaseService, FunctionsService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ReplyBaseDataSource } from '@root/modules/posts/data/datasources/reply-base'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'

export class ReplyFirebaseDataSource implements ReplyBaseDataSource{

	public async create(postId: string, data: ReplyToModel): Promise<string> {
		return await DatabaseService.create(`posts/${postId}/replies`, data)
		//return await FirestoreService.create(`posts/${postId}/replies`, data)
	}

	public async get(postId: string, conditions?: GetClauses): Promise<ReplyFromModel[]> {
		const docs = await DatabaseService.get(`posts/${postId}/replies`, conditions) as { [key: string]: ReplyFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
		//return await FirestoreService.get(`posts/${postId}/replies`,conditions) as ReplyFromModel[]
	}

	public async listen(postId: string, callback: (documents: ReplyFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		const cb = (documents: { [key: string]: ReplyFromModel } ) => {
			const models = Object.entries(documents ?? {}).map((e) => ({ ...e[1], id: e[0] }))
			callback(models)
		}
		return await DatabaseService.listen(`posts/${postId}/replies`, cb, conditions)
		//return await FirestoreService.listen(callback, `posts/${postId}/replies`, conditions)
	}

	public async upvote(post: string, reply: string, user: string, voterId: string) {
		const dependencies = {
			post, id: voterId,
			user, reply
		}
		return await FunctionsService.call('upvoteReply', dependencies)
	}

	public async downvote(post: string, reply: string, user: string, voterId: string) {
		const dependencies = {
			post, id: voterId,
			user, reply
		}
		return await FunctionsService.call('downvoteReply', dependencies)
	}

}
