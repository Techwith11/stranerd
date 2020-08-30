<template>
	<search collection="articles" :transformResults="transformResults">
		<template v-slot:item="{ item }">
			<div class="text-dark small">
				<h6 class="mb-0 text-truncate">
					<router-link :to="`/blog/${item.article.id}`" class="card-link">
						<ais-highlight :hit="item" attribute="title" />
					</router-link>
				</h6>
				<p class="mb-0">{{ item.article.body }}</p>
				<ais-highlight :hit="item" attribute="tags" />
			</div>
		</template>
	</search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { extractTextFromHTML, trimToLength } from '@root/modules/core/validations/sanitizers'
import { ArticleFromModel } from '@root/modules/blog/data/models/article'
export default defineComponent({
	setup(){
		return {
			transformResults: (items: any[]) => items
				.map((item) => {
					const { objectID: id, title, body, tags } = item as ArticleFromModel & { objectID: string }
					item.article = { id, title, body: trimToLength(extractTextFromHTML(body), 50), tags }
					return item
				})
		}
	}
})
</script>
