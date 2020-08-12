import { computed, reactive } from '@vue/composition-api'
import { ArticleEntity } from '@root/modules/blog/domain/entities/article'
import { DeleteArticle, GetArticles, FindArticle } from '@root/modules/blog'
import { Alert, Notify } from '@/config/notifications'
import { UserEntity } from '@root/modules/users/domain/entities/user'
import { fetchUser } from '@/usescases/users/users'
import router from '@/router'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)

const globalState = reactive({
	articles: reactive([]) as ArticleEntity[],
	fetched: false,
	loading: false,
	error: '',
	hasMore: false,
	olderArticlesLoading: false,
	listener: () => {}
})

const setArticle = (article: ArticleEntity) => {
	const index = globalState.articles.findIndex(p => p.id === article.id)
	if(index !== -1) globalState.articles[index] = article
	else globalState.articles.push(article)
}
const unshiftArticle = (article: ArticleEntity) => {
	const index = globalState.articles.findIndex(p => p.id === article.id)
	if(index !== -1) globalState.articles[index] = article
	else globalState.articles.unshift(article)
}
const fetchArticles = async () => {
	const date = globalState.articles[0]?.createdAt ?? undefined
	const entities = await GetArticles.call(date)
	globalState.hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach(setArticle)
}
const fetchArticlesOnInit = async () => {
	globalState.loading = true
	await fetchArticles().catch(() => globalState.error = 'Failed to fetch articles')
	if(globalState.articles.length === 0) globalState.error = 'No articles available at the moment. Check again later'
	globalState.loading = false
}
const fetchOlderArticles = async () => {
	globalState.olderArticlesLoading = true
	await fetchArticles()
	globalState.olderArticlesLoading = true
}

export const useArticlesList = () => {
	if(!globalState.fetched) fetchArticlesOnInit().then(() => globalState.fetched = true)

	return {
		loading: computed(() => globalState.loading),
		olderArticlesLoading: computed(() => globalState.olderArticlesLoading),
		hasMore: computed(() => globalState.hasMore),
		error: computed(() => globalState.error),

		articles: computed(() => globalState.articles),

		fetchOlderArticles
	}
	//TODO: Think abt whether to add listeners
}

export const useDeleteArticle = (article: ArticleEntity) => {
	const state = reactive({ loading: false })
	const deleteArticle = async () :Promise<boolean> => {
		try {
			const result = await Alert({
				title: 'Delete article',
				text: 'Are you sure you want to delete this article? This cannot be undone',
				icon: 'info',
				confirmButtonText: 'Delete'
			})
			if(result.value) {
				state.loading = true
				await DeleteArticle.call(article.id)
				globalState.articles = globalState.articles.filter(a => a.id !== article.id)
				state.loading = false
				await Notify({ icon: 'success', title: 'Article deleted successfully' })
			}
			return result.value
		} catch(error) {
			await Notify({ icon: 'error', title: error.message })
			return false
		}
	}
	return {
		loading: computed(() => state.loading),
		deleteArticle
	}
}

const fetchArticle = async (id: string) => {
	let article = globalState.articles.find(article => article.id === id)
	if(article) return article
	article = await FindArticle.call(id)
	if(article) unshiftArticle(article)
	return article
}

export const useSingleArticle = (id: string) => {
	const state = reactive({
		loading: false,
		article: undefined as ArticleEntity | undefined,
		user: undefined as UserEntity | undefined,
		error: ''
	})
	const findArticle = async () => {
		state.loading = true
		const article = await fetchArticle(id)
		if(article){
			state.article = article
			state.user = await fetchUser(article.userId)
		}
		else{
			await router.push('/articles')
			await Notify({ title: 'No such article found', icon: 'error' })
		}
		state.loading = false
	}
	findArticle().catch(() => state.error = 'Failed to fetch article')
	return {
		loading: computed(() => state.loading),
		article: computed(() => state.article),
		user: computed(() => state.user),
		error: computed(() => state.error)
	}
}
