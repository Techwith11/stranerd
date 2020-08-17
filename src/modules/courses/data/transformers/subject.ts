import { SubjectFromModel, SubjectToModel } from '@root/modules/courses/data/models/subject'
import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'

export class SubjectTransformer {
	public fromJSON(model: SubjectFromModel) {
		const { id, name, modules } = model
		return new SubjectEntity({
			id, name, modules
		})
	}

	public toJSON(entity: SubjectEntity) :SubjectToModel {
		return {
			name: entity.name,
			modules: entity.modules.map((m) => ({ name: m.name, image: m.imageData }))
		}
	}

}
