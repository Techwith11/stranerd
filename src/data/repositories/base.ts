import BaseDataSource, { GetClauses } from '@data/datasources/base'
import BaseModel, { BaseModelI } from '@data/models/base'
import BaseEntity from '@root/domains/entities/base'

export default abstract class BaseRepository<T extends BaseModel<BaseEntity, BaseModelI>> {
    protected abstract readonly collectionName: string
    private readonly dataSource: BaseDataSource

    constructor(dataSource: BaseDataSource) {
        this.dataSource = dataSource
    }

    public async create(data: T){
        return await this.dataSource.create(this.collectionName, data.toJSON())
    }

    public async find(id: string){
        return await this.dataSource.find(this.collectionName, id);
    }

    public async get(conditions?: GetClauses) {
        return await this.dataSource.get(this.collectionName, conditions);
    }

    public async update(id: string, data: T){
        return await this.dataSource.update(this.collectionName, id, data.toJSON());
    }
}
