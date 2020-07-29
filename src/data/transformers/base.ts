export default abstract class BaseTransformer<Entity,Model> {
    abstract fromJSON: (model: Model) => Entity
    abstract toJSON: () => Model
}
