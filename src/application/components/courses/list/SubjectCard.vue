<template>
	<div class="mt-3 mb-7">
		<router-link class="text-muted h4 text-decoration-none mb-3 d-inline-block text-capitalize" :to="`/courses/${subject.name.toLowerCase()}`">{{ subject.name }}</router-link>
		<div class="row">
			<div class="col-sm-6 col-md-4 col-lg-3 mb-3 d-flex flex-column" v-for="module in subject.modules" :key="module.name">
				<div class="bg-light" style="height: 150px;">
          <router-link :to="`/courses/${subject.name}/${module.name}`">
            <img :src="module.image" alt="" class="h-100 w-100" v-if="module.image">
          </router-link>
				</div>
				<div class="bg-gold-light text-center">
					<router-link :to="`/courses/${subject.name}/${module.name}`" class="text-muted  text-capitalize lead">{{ module.name }}</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'
export default defineComponent({
	props: {
		subject: {
			required: true,
			type: SubjectEntity
		}
	},
})
</script>
