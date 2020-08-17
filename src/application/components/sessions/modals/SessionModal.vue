<template>
	<div class="modal-background">
		<div class="modal-inner">
			<duration-form v-if="isSessionModalStudentDuration" />
			<tutor-accept v-if="isSessionModalTutorAccept" />
			<student-waiting v-if="isSessionModalStudentWaiting" />
			<tutor-cancelled v-if="isSessionModalTutorCancelled" />
			<student-cancelled v-if="isSessionModalStudentCancelled" />
			<student-pays v-if="isSessionModalStudentPays" />
			<tutor-waiting v-if="isSessionModalTutorWaiting" />
			<session-ratings v-if="isSessionModalSessionRatings" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import DurationForm from '@/components/sessions/modals/DurationForm'
import TutorAccept from '@/components/sessions/modals/TutorAccept'
import StudentWaiting from '@/components/sessions/modals/StudentWaiting'
import TutorCancelled from '@/components/sessions/modals/TutorCancelled'
import StudentCancelled from '@/components/sessions/modals/StudentCancelled'
import StudentPays from '@/components/sessions/modals/StudentPays'
import TutorWaiting from '@/components/sessions/modals/TutorWaiting'
import SessionRatings from '@/components/sessions/modals/SessionRatings'
export default {
	computed: {
		...mapGetters([
			'isSessionModalStudentDuration',
			'isSessionModalTutorAccept',
			'isSessionModalStudentWaiting',
			'isSessionModalTutorCancelled',
			'isSessionModalStudentCancelled',
			'isSessionModalStudentPays',
			'isSessionModalTutorWaiting',
			'isSessionModalSessionRatings'
		])
	},
	components: {
		'duration-form': DurationForm,
		'tutor-accept': TutorAccept,
		'student-waiting': StudentWaiting,
		'tutor-cancelled': TutorCancelled,
		'student-cancelled': StudentCancelled,
		'student-pays': StudentPays,
		'tutor-waiting': TutorWaiting,
		'session-ratings': SessionRatings,
	}
}
</script>