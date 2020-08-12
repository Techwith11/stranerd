import { computed, reactive } from '@vue/composition-api'
import { ArticleEntity } from '@root/modules/blog/domain/entities/article'
import { DeleteArticle, GetArticles } from '@root/modules/blog'
import { Alert, Notify } from '@/config/notifications'

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
	const deleteArticle = async () => {
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
				await Notify({ icon: 'success', title: 'Post deleted successfully' })
			}
		} catch(error) {
			await Notify({ icon: 'error', title: error.message })
		}
	}
	return {
		loading: computed(() => state.loading),
		deleteArticle
	}
}
