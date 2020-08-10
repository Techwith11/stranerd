<template>
	<div class="p-3 white shadow-sm">
		<div class="d-flex align-items-center">
			<img :src="user.image" alt="" class="profile-image">
			<div>
				<h5 class="font-weight-bold">
					<router-link :to="`/users/${user.id}`" class="card-link">{{ user.name }}</router-link>
				</h5>
				<p class="card-text mb-0">
					<span class="text-capitalize" v-for="course in user.teachableCourses" :key="course">{{ course }}</span>
				</p>
				<rating-stars class="small d-inline" :rating="user.tutor.rating"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import RatingStars from '@/components/helpers/RatingStars.vue'
	import UserEntity from '@root/modules/users/domain/entities/user'
	export default defineComponent({
		props: {
			user: {
				required: true,
				type: UserEntity
			}
		},
		components: {
			'rating-stars': RatingStars
		}
	})
</script>
