import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { ReplyBaseDataSource } from '../datasources/reply-base'
import { ReplyFromModel, ReplyToModel } from '../models/reply'

export class ReplyFirebaseDataSource implements ReplyBaseDataSource{

	public async create(postId: string, data: ReplyToModel): Promise<string> {
		return await DatabaseService.create(`posts/${postId}/replies`, data)
	}

	public async get(postId: string, conditions?: GetClauses): Promise<ReplyFromModel[]> {
		const docs = await DatabaseService.get(`posts/${postId}/replies`, conditions) as { [key: string]: ReplyFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
	}

	public async listen(postId: string, callback: (documents: ReplyFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		const cb = (documents: { [key: string]: ReplyFromModel } ) => {
			const models = Object.entries(documents ?? {}).map((e) => ({ ...e[1], id: e[0] }))
			callback(models)
		}
		return await DatabaseService.listen(`posts/${postId}/replies`, cb, conditions)
	}

	public async like(postId: string, replyId: string, userId: string) {
		await DatabaseService.update(`posts/${postId}/replies/${replyId}`, {
			[`likes/${userId}`]: true,
			[`dislikes/${userId}`]: false
		})
	}

	public async dislike(postId: string, replyId: string, userId: string) {
		await DatabaseService.update(`posts/${postId}/replies/${replyId}`, {
			[`likes/${userId}`]: false,
			[`dislikes/${userId}`]: true
		})
	}

}
