import BaseDataSource, { GetClauses } from '@data/datasources/base'

export default class BaseRepository {
    protected readonly collectionName: string = ''
    private readonly dataSource: BaseDataSource

    constructor(dataSource: BaseDataSource) {
        this.dataSource = dataSource
    }

    public async create(data: object){
        return await this.dataSource.create(this.collectionName, data)
    }

    public async find(id: string){
        return await this.dataSource.find(this.collectionName, id);
    }

    public async get(conditions?: GetClauses) {
        return await this.dataSource.get(this.collectionName, conditions);
    }

    public async update(id: string, data: object){
        return await this.dataSource.update(this.collectionName, id, data);
    }
}
