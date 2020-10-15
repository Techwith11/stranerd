import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'
import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'

export class UserTransformer {
	public fromJSON(model: UserFromModel) {
		const { id, bio, roles, tutor, dates, account } = model
		return new UserEntity({
			id, bio, roles, account,
			dates: {
				registeredAt: timestampToDate(dates.registeredAt)!
			},
			...(roles?.isTutor ? { tutor } : {})
		})
	}

	public toJSON(entity: UserEntity) :UserToModel {
		return {
			bio: entity.userBio,
			roles: entity.roles,
			account: entity.account,
			...(entity.roles.isTutor ? { tutor: entity.tutor } : {})
		}
	}

}
