<template>
	<div class="container">
		<session-nav />
		<session-student v-if="!isRouteMyTaughtSessions" />
		<session-tutor v-if="isRouteMyTaughtSessions" />
	</div>
</template>

<script>
	import SessionNav from '@/components/sessions/list/SessionNav'
	import SessionStudent from '@/components/sessions/list/SessionStudent'
	import SessionTutor from '@/components/sessions/list/SessionTutor'
	export default {
		name: 'Sessions',
		computed: {
			isRouteMyTaughtSessions(){ return this.$route.query.tab === 'byMe'  }
		},
		components: {
			'session-nav': SessionNav,
			'session-student': SessionStudent,
			'session-tutor': SessionTutor,
		},
		meta(){
			return {
				title: 'Recent Sessions',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>