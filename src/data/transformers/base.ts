import BaseEntity from '@root/domains/entities/base'
import { BaseFromModel, BaseToModel } from '@data/models/base'

export default abstract class BaseTransformer<Entity extends BaseEntity,From extends BaseFromModel, To extends BaseToModel> {
    abstract fromJSON: (model: From) => Entity
    abstract toJSON: (entity: Entity) => To //TODO: Implement differences in create and update in usecases
}
