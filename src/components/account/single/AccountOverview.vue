<template>
	<div>
		<div class="row align-items-center d-flex">
			<div class="col-sm-3">
				<img :src="getUserImageLink" alt="" class="w-100">
			</div>
			<div class="col-sm-9">
				<h4>{{ getUser.bio.name }}</h4>
				<h6>{{ getUser.bio.email }}</h6>
				<p>{{ getUser.bio.bio }}</p>
			</div>
		</div>
		<button class="floating-button" @click="setAccountModalStateOverview"><i class="fas fa-cog"></i></button>
		<div class="my-3">
			<h5>Subscription</h5>
			<div v-if="getUser.account.subscription && getUser.account.subscription.id" class="row">
				<div class="col-md-6">
					<p class="text-capitalize"><span class="font-weight-bold">Current plan: </span> {{ getUser.account.subscription.planId.split('_').join(' ') }}</p>
				</div>
				<div class="col-md-6">
					<p><span class="font-weight-bold">Next billing date: </span>{{ getUser.account.subscription.nextBillingDate }}</p>
				</div>
				<div class="col-md-6">
					<p><span class="font-weight-bold">Price: </span>{{ getUser.account.subscription.price }}</p>
				</div>
				<div class="col-md-6">
					<p><span class="font-weight-bold">Status: </span>{{ getUser.account.subscription.status }}</p>
				</div>
				<div class="col-md-6">
					<p><span class="font-weight-bold">Questions Left: </span>{{ getUser.account.questions }}</p>
				</div>
			</div>
			<div v-else>
				<p>You are currently not on any subscription plan. Click below to select one from our generous packages.</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-info small" @click="setAccountModalStateSelectSubscription">Subscribe Now</button>
				</div>
			</div>
		</div>
		<div class="my-3" v-if="getUser.roles.isTutor">
			<h5>Tutor Information</h5>
			<div class="row">
				<div class="col-md-6">
					<p>Certified to teach: {{ getUser.tutor.canTeach }}</p>
				</div>
				<div class="col-md-6">
					<p>Overall Rating: {{ getUser.tutor.rating }}</p>
				</div>
				<div class="col-12">
					<h6>Courses</h6>
					<ul>
						<li v-for="course in getUser.tutor.courses" :key="course">
							<span class="font-weight-bold text-capitalize">{{ course }} </span>
							<span>Level {{ getUser.tutor.levels[course] }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<router-link class="btn btn-primary" to="/tests/tutors">Take test</router-link>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		computed: {
			...mapGetters(['getUser','getDefaultImage']),
			getUserImageLink(){ return this.getUser && this.getUser.bio.image ? this.getUser.bio.image.link : this.getDefaultImage }
		},
		methods: {
			...mapActions(['setAccountModalStateOverview','setAccountModalStateSelectSubscription'])
		}
	}
</script>