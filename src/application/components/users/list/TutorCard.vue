<template>
	<div class="p-3 white">
		<div class="d-flex align-items-start">
			<img :src="user.image" alt="" class="profile-image">
			<div class="flex-grow-1 d-flex flex-column">
				<div class="mb-2">
			<h5 class="font-weight-bold mb-0 text-truncate">
				<router-link :to="`/users/${user.id}`" class="card-link">{{ user.name }}</router-link>
			</h5>
            <rating-stars class="small mt-0" :rating="user.tutor.rating"/>
	        </div>
		        <p class="card-text">
		          <span class="text-capitalize d-block" v-for="course in user.teachableCourses" :key="course">{{ course }}</span>
		        </p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import RatingStars from '@application/components/helpers/RatingStars.vue'
import { UserEntity } from '@modules/users/domain/entities/user'
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
