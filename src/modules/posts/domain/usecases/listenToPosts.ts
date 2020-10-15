import { IPostRepository } from '@modules/posts/domain/irepositories/ipost'
import { PostEntity } from '@modules/posts/domain/entities/post'
import { GetClauses } from '@modules/core/data/datasources/base'

export class ListenToPostsUseCase {
    private repository: IPostRepository

    constructor(repository: IPostRepository) {
	    this.repository = repository
    }

    public async call (callback: (entities: PostEntity[]) => void, date?: Date) :Promise<() => void > {
	    const conditions: GetClauses = {
		    order: {
			    field: 'dates.createdAt',
			    desc: true
		    }
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
	    return await this.repository.listen(callback, conditions)
    }

}

