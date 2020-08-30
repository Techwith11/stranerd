<template>
	<ais-instant-search :search-client="searchClient" :index-name="collection">
		<ais-search-box>
			<div slot="default" class="form-group mb-2 d-flex align-items-center"
			     slot-scope="{ currentRefinement, isSearchStalled, refine }">
				<input placeholder="Search" type="search" class="form-control"
				       :value="currentRefinement" @input="refine($event.currentTarget.value)">
				<span v-if="isSearchStalled" class="ml-2"><i class="fas fa-spinner fa-spin text-info"></i></span>
			</div>
			<div slot="submit-icon"><i class="fas fa-search text-dark"></i></div>
			<div slot="reset-icon"><i class="fas fa-trash text-danger"></i></div>
		</ais-search-box>
		<ais-state-results>
			<template v-slot="{ state: { query }, results: { hits } }">
				<ais-hits v-if="query.length > 0 && hits.length > 0" :transform-items="transformResults">
					<template v-slot="{ items }">
						<ul v-for="(item, index) in items" :key="item.objectID"
						    class="list-group position-absolute rounded-xl shadow-sm m-1" style="z-index: 1;">
							<li class="list-group-item border-0">
								<slot name="item" :item="item" :index="index"></slot>
							</li>
						</ul>
						<ais-powered-by class="mx-3" :theme="theme" />
					</template>
				</ais-hits>
				<p v-if="!hits.length">No results found for <q>{{ query }}</q></p>
				<ais-current-refinements></ais-current-refinements>
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
			required: true
		},
		theme: {
			type: String,
			default: () => 'light',
			validator: (value: string) => ['light', 'dark'].indexOf(value) !== -1
		},
		transformResults: {
			type: Function as PropType<((items: any[]) => items)>,
			default: (items: any[]) => items
		}
	},
	setup(){
		return {
			searchClient: algoliasearch(process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_API_KEY)
		}
	}
})
</script>
