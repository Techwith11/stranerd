<template>
	<div class="modal-background">
		<div class="modal-inner">
			<duration-form v-if="isSessionModalStateStudentDuration" />
			<tutor-accept v-if="isSessionModalStateTutorAccept" />
			<student-waiting v-if="isSessionModalStateStudentWaiting" />
			<tutor-cancelled v-if="isSessionModalStateTutorCancelled" />
			<student-cancelled v-if="isSessionModalStateStudentCancelled" />
		</div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
	import DurationForm from '@/components/sessions/modals/DurationForm'
	import TutorAccept from '@/components/sessions/modals/TutorAccept'
	import StudentWaiting from '@/components/sessions/modals/StudentWaiting'
    import TutorCancelled from "@/components/sessions/modals/TutorCancelled"
    import StudentCancelled from "@/components/sessions/modals/StudentCancelled";
    export default {
        computed: {
            ...mapGetters([
                'isSessionModalStateStudentDuration',
				'isSessionModalStateTutorAccept',
				'isSessionModalStateStudentWaiting',
				'isSessionModalStateTutorCancelled',
                'isSessionModalStateStudentCancelled',
            ])
        },
		components: {
            'duration-form': DurationForm,
            'tutor-accept': TutorAccept,
            'student-waiting': StudentWaiting,
			'tutor-cancelled': TutorCancelled,
            'student-cancelled': StudentCancelled,
		}
    }
</script>