<template>
	<div class="row">
		<div class="col-sm-3">
			<img :src="getUserImageLink" alt="" class="w-100">
		</div>
		<div class="col-sm-9">
			<h4>{{ getUser.bio.name }}</h4>
			<h6>{{ getUser.bio.email }}</h6>
			<p>{{ getUser.bio.bio }}</p>
		</div>
		<div class="col-12 d-flex justify-content-between">
			<button class="btn btn-warning text-white" @click="setAccountModalStateUpdatePassword">
				<i class="fas fa-eye mr-2"></i>
				<span>Update Password</span>
			</button>
			<button class="btn btn-warning text-white" @click="setAccountModalStateEditProfile">
				<i class="fas fa-pen mr-2"></i>
				<span>Edit profile</span>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		computed: {
			...mapGetters(['getUser']),
			getUserImageLink(){ return this.getUser && this.getUser.bio.image ? this.getUser.bio.image.link : '' }
		},
		methods: {
			...mapActions(['setAccountModalStateUpdatePassword','setAccountModalStateEditProfile'])
		}
	}
</script>