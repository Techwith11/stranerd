<template>
	<div class="modal-background">
		<div class="modal-inner">
			<overview v-if="isModalOverview" />
			<login v-if="isModalLogin" />
			<register-student v-if="isModalRegisterStudent" />
			<register-tutor v-if="isModalRegisterTutor" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Overview from '@/components/auth/Overview'
	import Login from '@/components/auth/Login'
	import RegisterStudent from '@/components/auth/RegisterStudent'
	import RegisterTutor from '@/components/auth/RegisterTutor'
	export default {
		components: {
			'overview': Overview,
			'login': Login,
			'register-student': RegisterStudent,
			'register-tutor': RegisterTutor,
		},
		computed: {
			...mapGetters(['isModalOverview','isModalLogin','isModalRegisterStudent','isModalRegisterTutor'])
		}
	}
</script>