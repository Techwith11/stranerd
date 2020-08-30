<template>
	<search collection="posts" :transformResults="transformResults">
		<template v-slot:item="{ item }">
			<div class="text-dark small">
				<h6 class="mb-0 text-truncate">
					<router-link :to="`/posts/${item.post.id}`" class="card-link">
						<ais-highlight :hit="item" attribute="title" />
					</router-link>
				</h6>
				<p class="mb-0">{{ item.post.body }}</p>
			</div>
		</template>
	</search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PostFromModel } from '@root/modules/posts/data/models/post'
import { extractTextFromHTML, trimToLength } from '@root/modules/core/validations/sanitizers'
export default defineComponent({
	setup(){
		return {
			transformResults: (items: any[]) => items
				.map((item) => {
					const { objectID: id, title, body, tags } = item as PostFromModel & { objectID: string }
					item.post = { id, title, body: trimToLength(extractTextFromHTML(body), 50), tags }
					return item
				})
		}
	}
})
</script>
