<template>
	<search collection="users" :transformResults="transformResults">
		<template v-slot:item="{ item }">
			<h4>
				<span><ais-highlight :hit="item" attribute="bio.name" /></span>
			</h4>
			<ais-highlight :hit="item"  attribute="bio.bio" />
		</template>
	</search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	setup(){
		return {
			transformResults: (items: any[]) => {
				console.log(items)
				return items
			}
		}
	}
})
</script>
