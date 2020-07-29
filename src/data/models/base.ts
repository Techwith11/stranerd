export default abstract class BaseModel<Entity,ModelI> {
    static fromJSON: (json: ModelI) => Entity
    toJSON: () => ModelI
}
