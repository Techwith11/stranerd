import IPostRepository from '@root/modules/posts/domain/irepositories/ipost'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetPostsUseCase {
    private repository: IPostRepository

    constructor(repository: IPostRepository) {
        this.repository = repository
    }

    public async call (date?: Date) :Promise<PostEntity[]> {
        const conditions: GetClauses = {
            order: {
                field: 'dates.createdAt',
                desc: true
            },
            limit: process.env.VUE_APP_PAGINATION_LIMIT
        }
        if(date){
            conditions.where = [
                {
                    field: 'dates.createdAt',
                    condition: '>',
                    value: date
                }
            ]
        }
        return this.repository.get(conditions)
    }

}

