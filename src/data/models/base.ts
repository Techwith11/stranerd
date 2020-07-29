export interface BaseModelI {}

export default abstract class BaseModel<Entity,ModelI> {
    static fromJSON: (json: ModelI) => Entity
    abstract toJSON: () => ModelI
}
