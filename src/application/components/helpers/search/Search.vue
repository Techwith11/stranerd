<template>
	<ais-instant-search :search-client="searchClient" :index-name="collection">
		<ais-search-box>
			<div slot="default" class="form-group mb-2 d-flex align-items-center"
				slot-scope="{ currentRefinement, isSearchStalled, refine }">
				<input placeholder="Search" type="search" class="form-control"
					:value="currentRefinement" @input="refine($event.currentTarget.value)">
				<loading class="ml-2" :class="isSearchStalled ? 'opacity-100' : 'opacity-0'" />
			</div>
			<div slot="submit-icon"><i class="fas fa-search text-dark"></i></div>
			<div slot="reset-icon"><i class="fas fa-trash text-danger"></i></div>
		</ais-search-box>
		<ais-state-results>
			<template v-slot="{ state: { query }, results: { hits } }">
				<ais-hits v-if="query.length > 0 && hits.length > 0" :transform-items="transformResults">
					<template v-slot="{ items }">
						<div class="position-absolute rounded-xl shadow-sm m-1 bg-white resultContainer">
							<ul class="list-group text-wrap">
								<li class="list-group-item text-wrap border-0" v-for="(item, index) in items" :key="item.objectID">
									<slot name="item" :item="item" :index="index"></slot>
								</li>
							</ul>
							<ais-powered-by class="m-3" :theme="theme" />
						</div>
					</template>
				</ais-hits>
				<p v-if="query.length && !hits.length">No results found for <q>{{ query }}</q></p>
			</template>
		</ais-state-results>
	</ais-instant-search>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import algoliasearch from 'algoliasearch/lite'
export default defineComponent({
	props: {
		collection: {
			type: String,
			required: true,
			validator: (value: string) => ['articles','courses','notes','posts','users'].indexOf(value) !== -1
		},
		theme: {
			type: String,
			default: () => 'light',
			validator: (value: string) => ['light', 'dark'].indexOf(value) !== -1
		},
		transformResults: {
			type: Function as PropType<((items: any[]) => any[])>,
			required: true
		}
	},
	setup(){
		return {
			searchClient: algoliasearch(process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_API_KEY)
		}
	}
})
</script>

<style lang="scss" scoped>
.resultContainer{
	z-index: 3;
	max-width: calc(100vw - 2rem);
}
@media (max-width: 500px){
	.resultContainer{ right: 0.25rem }
}
</style>
