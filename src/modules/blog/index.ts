import Bottle from 'bottlejs'
import ArticleFirebaseDataSource from '@root/modules/blog/data/datasources/article-firebase'
import ArticleTransformer from '@root/modules/blog/data/transformers/article'
import ArticleRepository from '@root/modules/blog/data/repositories/article'

const bottle = new Bottle()

bottle.service('DataSources.Article', ArticleFirebaseDataSource)

bottle.service('Transformers.Article', ArticleTransformer)

bottle.service('Repositories.Article', ArticleRepository, 'DataSources.Article','Transformers.Article')
