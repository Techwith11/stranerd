<template>
	<div class="container py-3" v-if="Object.keys(getUser).length > 0">
		<div class="btn-group mb-3" role="group">
			<button type="button" class="btn btn-primary mr-3" @click="setId('kevin11')">Login as Kevin11</button>
			<button type="button" class="btn btn-primary mr-3" @click="setId('frank')">Login as Frank</button>
			<button type="button" class="btn btn-primary mr-3" @click="setId('max')">Login as Max</button>
			<button type="button" class="btn btn-primary mr-3" @click="setId('joe')">Login as Joe</button>
			<hr>
		</div>
		<div>
			<div class="custom-control custom-radio d-flex" v-for="method in paymentMethods" :key="method['.key']">
				<input type="radio" :id="method.token" name="customRadio" class="custom-control-input" v-model="token" :value="method.token">
				<label class="custom-control-label" :for="method.token">{{ method.maskedNumber }}</label>
				<span class="ml-5">{{ method.cardType }}</span>
				<span class="ml-auto">{{ method.expirationDate }}</span>
				<a class="text-info text-decoration-none ml-3" @click="pay(method.token)">Make Payment of $1</a>
			</div>
		</div>
		<div class="mb-3">
			<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_monthly_amateur_plan')">Stranerd Amateur subscription $9.99/month</button>
			<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_yearly_amateur_plan')">Stranerd basic subscription 16% off $100/year</button>
			<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_monthly_intermediate_plan')">Stranerd intermediate subscription $14.99/month</button>
			<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_yearly_intermediate_plan')">Stranerd intermediate subscription 16% off $150/year</button>
			<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_monthly_master_plan')">Stranerd master subscription $19.99/month</button>
			<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_yearly_master_plan')">Stranerd master subscription 16% off $200/year</button>
		</div>
		<div>
			<helper-spinner v-if="isLoading" />
			<form>
				<div class="form-group">
					<label>Credit Card Number</label>
					<div id="creditCardNumber" class="form-control"></div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-6">
							<label>Expire Date</label>
							<div id="expireDate" class="form-control"></div>
						</div>
						<div class="col-6">
							<label>CVV</label>
							<div id="cvv" class="form-control"></div>
						</div>
					</div>
				</div>
				<div class="text-center">
					<button class="btn btn-primary btn-block" :disabled="!isThereAHoistedFieldInstance" @click.prevent="addCard">Add Credit Card</button>
				</div>
				<hr />
				<div class="form-group text-center">
					<div id="paypalButton"></div>
				</div>
			</form>
		</div>
		<div>
			<h4>Bio</h4>
			<p>Name: {{ getUser.bio.name }}</p>
			<p>Email: {{ getUser.bio.email }}</p>
			<p>Bio: {{ getUser.bio.bio }}</p>
			<hr>
		</div>
		<div>
			<h4>Status</h4>
			<p>Online: {{ getUser.status.online }}</p>
			<p>Last seen: {{ new Date(getUser.status.lastSeen.seconds * 1000) }}</p>
			<hr>
		</div>
		<div>
			<h4>Dates</h4>
			<p>Registered on: {{ new Date(getUser.dates.registeredAt.seconds * 1000) }}</p>
			<hr>
		</div>
		<div>
			<h4>Account Type</h4>
			<p>Premium: {{ getUser.account.premium }}</p>
			<p>Customer_ID: {{ getUser.account.customer_id }}</p>
			<p>{{ getUser.account.subscription }}</p>
			<hr>
		</div>
		<div>
			<h4>Roles</h4>
			<span class="mr-3">Student: {{ !!getUser.roles.isStudent }}</span>
			<span class="mr-3">Tutor: {{ !!getUser.roles.isTutor }}</span>
			<span class="mr-3">Admin: {{ !!getUser.roles.isAdmin }}</span>
			<hr>
		</div>
		<div v-if="getUser.roles.isTutor">
			<h4>Tutor details</h4>
			<p>CanTeach: {{ getUser.tutor.canTeach }}</p>
			<div v-for="course in getUser.tutor.courses" :key="'upgrade/'+course">
				<p>Level {{ getUser.tutor['levels'][course] }} {{ course }}</p>
				<ul v-for="upgrade in Object.entries(getUser.tutor.upgrade[course]).sort((a,b) => a[0] - b[0])" :key="upgrade[0]">
					<li class="font-weight-bold">Level {{ upgrade[0] }}</li>
					<li>Score: {{ upgrade[1].score }}</li>
					<li class="mb-3">On: {{ new Date(upgrade[1].takenAt.seconds * 1000) }}</li>
				</ul>
			</div>
			<p>Qualification: {{ getUser.tutor.qualification }}</p>
			<p>Rating: {{ getUser.tutor.rating }}</p>
			<hr>
		</div>
		<div>
			<h4>Chatted With</h4>
			<p>{{ getUser.chattedWith.join(', ') }}</p>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		name: 'MyAccount',
		data: () => ({
			isLoading: true,
			paymentMethods: [],
			token: ''
		}),
		computed: {
			...mapGetters(['getUser','isThereAHoistedFieldInstance','getId'])
		},
		methods:{
			...mapActions(['setId','initPaymentFields','createPaymentMethod','makePayment','subscribeToPlan']),
			async addCard(){
				this.isLoading = true
				await this.createPaymentMethod()
				this.isLoading = false
			},
			async pay(token){
				this.isLoading = true
				await this.makePayment({ amount: 1, token })
				this.isLoading = false
			},
			async subscribe(planId){
				if(!this.token){ return new window.Toast({ icon:'error', title: 'No card chosen' }) }
				this.isLoading = true
				await this.subscribeToPlan({ token: this.token, planId })
				this.isLoading = false
			}
		},
		async mounted(){
			let docs = await firestore.collection(`users/${this.getId}/paymentMethods`).get()
			docs.forEach(doc => this.paymentMethods.push({ '.key': doc.id, ...doc.data() }))
			await this.initPaymentFields()
			this.isLoading = false
		},
		components: {
			'helper-spinner': HelperSpinner
		}
	}
</script>