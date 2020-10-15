<template>
	<div>
		<page-loading v-if="subjectLoading" />
		<div class="my-5 bg-white p-4 shadow-sm rounded-lg">
			<h4 class="text-muted mb-3">Upgrade User to Tutor</h4>
			<div class="d-flex align-items-center">
				<input type="email" class="form-control flex-grow-1" placeholder="Enter user's email address" v-model="email">
				<a @click.prevent="reset"><i class="fas fa-trash mx-3 text-danger"></i></a>
			</div>
			<button class="btn mx-0 px-3 btn-primary my-3" @click="getUsersByEmail" :disabled="!email">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Find User</span>
			</button>
			<template v-if="fetched && !loading">
				<div class="form-group my-3">
					<select id="course" class="form-control text-capitalize" v-model="course">
						<option :value="null" disabled>Select the course tutor can teach</option>
						<option :value="subject.name" v-for="subject in subjects" :key="subject.id">{{ subject.name }}</option>
					</select>
				</div>
				<div class="mt-2">
					<p class="text-danger opacity-75" v-if="users.length === 0">No user with such email exist</p>
					<div class="my-3" v-for="user in users" :key="user.id">
						<div class="d-flex flex-wrap justify-content-between align-items-center">
							<div class="text-truncate">
								<p class="lead mb-1 text-wrap">{{ user.name }}</p>
								<p class="small mb-0 text-wrap">{{ user.email }}</p>
							</div>
							<a class="text-info" v-if="user.roles.isTutor && user.tutor.courses.includes(course)" @click.prevent="() => {}">Already a {{ course }} tutor</a>
							<button class="btn-sm mx-0 btn-success" @click="makeTutor(user)" :disabled="!course || upgrading" v-else>
								<i class="fas fa-spinner fa-spin mr-1" v-if="upgrading"></i>
								<span>Make tutor</span>
							</button>
						</div>
						<hr class="mt-2">
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSubjects } from '@application/usecases/courses/subjects'
import { useTutorRoles } from '@application/usecases/users/role'
export default defineComponent({
	setup(){
		const { subjects, loading: subjectLoading } = useSubjects()
		const { loading, fetched, upgrading, course, email, users, getUsersByEmail, makeTutor, reset } = useTutorRoles()
		return {
			subjects, subjectLoading,
			loading, fetched, upgrading, email, course, users, getUsersByEmail, makeTutor, reset
		}
	}
})
</script>
