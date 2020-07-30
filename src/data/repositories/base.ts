import BaseDataSource, { GetClauses } from '@data/datasources/base'
import type BaseModel from '@data/models/base'
import BaseTransformer from '@data/transformers/base'
import BaseEntity from '@root/domains/entities/base'

export default abstract class BaseRepository<Entity extends BaseEntity, Model extends BaseModel> {
    protected abstract readonly collectionName: string
    private readonly dataSource: BaseDataSource
    private readonly transformer: BaseTransformer<Entity, Model>

    constructor(dataSource: BaseDataSource, transformer: BaseTransformer<Entity, Model>) {
        this.dataSource = dataSource
        this.transformer = transformer
    }

    public async create(data: Entity){
        const model = this.transformer.toJSON(data)
        return await this.dataSource.create(this.collectionName, model)
    }

    public async find(id: string){
        const model = await this.dataSource.find(this.collectionName, id)
        if(model) return this.transformer.fromJSON(model as Model)
        else return undefined
    }

    public async get(conditions?: GetClauses) {
        const models =  await this.dataSource.get(this.collectionName, conditions)
        return models.map(model => this.transformer.fromJSON(model as Model))
    }

    public async update(id: string, data: Entity){
        const model = this.transformer.toJSON(data)
        return await this.dataSource.update(this.collectionName, id, model)
    }
}
