import BaseEntity from '@root/domains/entities/base'
import BaseModel from '@data/models/base'

export default abstract class BaseTransformer<Entity extends BaseEntity,Model extends BaseModel> {
    abstract fromJSON: (model: Model) => Entity
    abstract toJSON: (entity: Entity) => Model
}
