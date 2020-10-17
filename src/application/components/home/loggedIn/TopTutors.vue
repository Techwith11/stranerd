<template>
	<div class="p-3 shadow white">
		<p class="text-muted txt-shadow">Top Tutors</p>
		<tutor-card class="my-2" v-for="tutor in tutors" :user="tutor" :key="tutor.id" />
		<p class="lead" v-if="error">{{ error }}</p>
		<div class="d-flex justify-content-end my-3" v-else>
			<router-link class="text-white btn btn-gold" to="/tutors">See More</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TutorCard from '@application/components/users/list/TutorCard.vue'
import { useTopTutorsList } from '@application/usecases/users/users'
export default defineComponent({
	setup(){
		const { loading, error, tutors } = useTopTutorsList()
		return { loading, error, tutors }
	},
	components: {
		'tutor-card': TutorCard
	}
})
</script>
