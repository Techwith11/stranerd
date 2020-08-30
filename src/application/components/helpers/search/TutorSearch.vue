<template>
	<search collection="users" :transformResults="transformResults">
		<template v-slot:item="{ item }">
			<div class="text-dark small">
				<div class="d-flex align-items-start">
					<img :src="item.tutor.image" alt="" class="profile-image">
					<div class="flex-grow-1">
						<div class="mb-2">
							<h6 class="mb-0 text-truncate">
								<router-link :to="`/users/${item.tutor.id}`" class="card-link">
									<ais-highlight :hit="item" attribute="bio.name" />
								</router-link>
							</h6>
							<rating-stars class="small mt-0" :rating="item.tutor.rating"/>
						</div>
						<p class="card-text">
							<span class="text-capitalize d-block" v-for="course in item.tutor.courses" :key="course">{{ course }}</span>
						</p>
					</div>
				</div>
			</div>
		</template>
	</search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { DEFAULT_IMAGE_URL } from '@root/modules/core/services/uploader'
import { TutorInfo, UserBio } from '@root/modules/users/domain/entities/user'
export default defineComponent({
	setup(){
		return {
			transformResults: (items: any[]) => items
				.filter((item) => item.tutor !== undefined)
				.map((item) => {
					const { objectID, bio, tutor } = item as { objectID: string, bio: UserBio, tutor: TutorInfo }
					item.tutor = {
						id: objectID,
						image: bio?.image?.link ?? DEFAULT_IMAGE_URL,
						rating: tutor.rating ?? 0,
						courses: tutor.courses?.filter((course) => tutor.levels?.[course]! > 0) ?? []
					}
					return item
				})
		}
	}
})
</script>

<style lang="scss" scoped>
	.profile-image{ width: 30px; height: 30px; }
</style>
