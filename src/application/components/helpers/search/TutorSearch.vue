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
							<span class="text-capitalize d-block" v-for="course in item.tutor.teachableCourses" :key="course">{{ course }}</span>
						</p>
					</div>
				</div>
			</div>
		</template>
	</search>
</template>

<script lang="ts">
const url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`
const DEFAULT_IMAGE_URL = process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png'
class Tutor {
	public id: string
	public bioData: UserBio
	public tutor: TutorInfo
	constructor({ id, bio, tutor }: { id: string, bio: UserBio, tutor: TutorInfo }){
		this.id = id
		this.bioData = bio
		this.tutor = tutor
	}
	get image(){ return this.bioData?.image?.link ?? DEFAULT_IMAGE_URL }
	get rating(){ return this.tutor?.rating ?? 0 }

	get teachableCourses(){
		return this.tutor?.courses?.filter((course) => this.tutor?.levels?.[course]! > 0) ?? []
	}
}
import { defineComponent } from '@vue/composition-api'
import { UserBio, TutorInfo } from '@root/modules/users/domain/entities/user'
export default defineComponent({
	setup(){
		return {
			transformResults: (items: any[]) => items
				.filter((item) => item.tutor !== undefined)
				.map((item) => {
					item.tutor = new Tutor({ id: item.objectID, bio: item.bio, tutor: item.tutor })
					delete item.bio
					return item
				})
		}
	}
})
</script>

<style lang="scss" scoped>
	.profile-image{ width: 30px; height: 30px; }
</style>
