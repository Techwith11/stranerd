import BaseEntity from '@root/modules/core/domains/entities/base'
import { BaseFromModel, BaseToModel } from '@root/modules/core/data/models/base'

export default abstract class BaseTransformer<Entity extends BaseEntity,From extends BaseFromModel, To extends BaseToModel> {
    abstract fromJSON: (model: From) => Entity
    abstract toJSON: (entity: Entity) => To
}
