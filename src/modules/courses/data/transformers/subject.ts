import { SubjectFromModel, SubjectToModel } from '../models/subject'
import { SubjectEntity } from '../../domain/entities/subject'

export class SubjectTransformer {
	public fromJSON(model: SubjectFromModel) {
		const { id, name, modules, image } = model
		return new SubjectEntity({
			id, name, modules, imageData: image
		})
	}

	public toJSON(entity: SubjectEntity) :SubjectToModel {
		return {
			name: entity.name,
			image: entity.imageData,
			modules: entity.modules.map((m) => ({ name: m.name, image: m.imageData }))
		}
	}

}
