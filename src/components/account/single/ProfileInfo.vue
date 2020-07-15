<template>
	<div class="row align-items-start">
		<div class="col-md-7 mb-4">
			<div class="d-flex align-items-center align-items-md-start">
				<div class="mb-3">
					<img :src="getUserImageLink" alt="" class="mr-3 profile">
					<a href="" class="text-info d-block" @click.prevent="setAccountModalEditProfile">Change picture</a>
				</div>
				<div class="flex-grow-1">
					<h4 class="text-primary-dark mb-1">{{ getUser.bio.name }}</h4>
					<h6 class="mb-3 small">{{ getUser.bio.email }}</h6>
					<div class="d-none d-md-block">
						<div class="bordered p-3 w-100 bg-white mb-3 rounded-xl">
							<p><span class="font-weight-bold">Bio:</span> {{ getUser.bio.bio }}</p>
						</div>
						<div class="d-flex justify-content-end">
							<a href="" class="text-info" @click.prevent="setAccountModalEditProfile">Change bio</a>
						</div>
					</div>
				</div>
			</div>
			<div class="d-md-none">
				<div class="bordered p-3 w-100 bg-white mb-3 rounded-xl">
					<p><span class="font-weight-bold">Bio:</span> {{ getUser.bio.bio }}</p>
				</div>
				<div class="d-flex justify-content-end">
					<a href="" class="text-info" @click.prevent="setAccountModalEditProfile">Change bio</a>
				</div>
			</div>
		</div>
		<div class="col-md-5 bordered rounded-xl p-3 bg-white" v-if="getUser.roles.isTutor">
			<p class="small font-weight-bold text-center">Tutor</p>
			<div>
				<ul class="list-group">
					<li class=" d-flex justify-content-between align-items-center mb-2" v-for="course in getUser.tutor.courses" :key="course">
						<span class="text-capitalize">{{ course }}</span>
						<span class="text-success" v-if="getUser.tutor.levels[course] > 0">
								<i class="fas fa-check"></i>
								<i class="ml-n2 fas fa-check"></i>
							</span>
						<router-link class="text-info" v-else to="/tests/tutors">Take test</router-link>
					</li>
					<li class="d-flex justify-content-between align-items-center mt-2">
						<span>Average Rating</span>
						<span>{{ getUser.tutor.rating }}</span>
					</li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		computed: {
			...mapGetters(['getUser', 'getDefaultImage']),
			getUserImageLink() {
				return this.getUser && this.getUser.bio.image ? this.getUser.bio.image.link : this.getDefaultImage
			}
		},
		methods: {
			...mapActions(['setAccountModalEditProfile'])
		}
	}
</script>

<style lang="scss" scoped>
	.profile{
		width: 120px;
		height: 120px;
		border-radius: 10rem;
		padding: 0.5rem;
		background: #FCCAE3;
	}
	.rounded-xl{
		border-radius: 2.0rem !important;
		box-shadow: 0 1px 2px $text-black;
	}
	.bg-white{
		background: $white;
	}
	.text-primary-dark{ color: $primary-dark }
</style>
