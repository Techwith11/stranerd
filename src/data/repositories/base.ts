import BaseDataSource, { GetClauses } from '@data/datasources/base'
import { BaseFromModel, BaseToModel } from '@data/models/base'
import BaseTransformer from '@data/transformers/base'
import BaseEntity from '@root/domains/entities/base'

export default abstract class BaseRepository<Entity extends BaseEntity, From extends BaseFromModel, To extends BaseToModel> {
    protected abstract readonly collectionName: string
    private readonly dataSource: BaseDataSource
    private readonly transformer: BaseTransformer<Entity, From, To>

    constructor(dataSource: BaseDataSource, transformer: BaseTransformer<Entity, From, To>) {
        this.dataSource = dataSource
        this.transformer = transformer
    }

    public async create(data: To){
        return await this.dataSource.create(this.collectionName, data) as From
    }

    public async find(id: string){
        const model = await this.dataSource.find(this.collectionName, id)
        if(model) return model as From
        else return undefined
    }

    public async get(conditions?: GetClauses) {
        const models =  await this.dataSource.get(this.collectionName, conditions)
        return models.map(model => model as From)
    }

    public async update(id: string, data: To){
        return await this.dataSource.update(this.collectionName, id, data) as From
    }
}
