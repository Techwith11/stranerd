import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ArticleBaseDataSource } from '@root/modules/blog/data/datasources/article-base'
import { ArticleFromModel, ArticleToModel } from '@root/modules/blog/data/models/article'

export class ArticleFirebaseDataSource implements ArticleBaseDataSource{

	public async create(article: ArticleToModel): Promise<string> {
		return await FirestoreService.create('blog', article)
	}

	public async find(id: string): Promise<ArticleFromModel | undefined> {
		return await FirestoreService.find('blog', id) as ArticleFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<ArticleFromModel[]> {
		return await FirestoreService.get('blog', conditions) as ArticleFromModel[]
	}

}
