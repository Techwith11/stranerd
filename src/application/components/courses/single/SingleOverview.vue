<template>
	<div class="container">
		<div class="d-flex flex-column">
			<div class="p-2 p-lg-4 rounded-lg my-2 my-lg-4">
				<p class="title font-weight-bold">Description</p>
				<div v-html="course.description" class="mb-4 editor-container"></div>
				<p class="small">
					<span class="font-weight-bold mr-4">Released Date: </span>
					<span>{{ course.createdDate }}</span>
				</p>
				<p class="small font-weight-bold text-capitalize">{{ course.subject }} : {{ course.module }}</p>
				<div class="my-3 text-white" v-if="isAdmin">
					<a class="mr-3 btn btn-sm btn-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
					<a class="mr-3 btn btn-sm btn-danger" @click.prevent="removePost"><i class="fas fa-trash mr-1"></i>Delete</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	props: {
		course: {
			required: true,
			type: Object
		}
	},
	computed: {
		...mapGetters(['isAdmin']),
	},
	methods:{
		...mapActions(['deleteCourse','setEditMeta','setEditModalCourse']),
		async removePost(){
			try{
				let result = await new window.SweetAlert({
					title: 'Delete course',
					text: 'Are you sure you want to delete this course? This cannot be undone',
					icon: 'info',
					showCancelButton: true,
					cancelButtonColor: '#3085d6',
					confirmButtonColor: '#d33',
					confirmButtonText: 'Delete'
				})
				if (result.value) {
					await this.deleteCourse(this.course['.key'])
					window.Fire.$emit('CourseDeleted', this.course)
					new window.Toast({ icon: 'success', title: 'Course deleted successfully' })
				}
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
		},
		async openEditModal(){
			this.setEditMeta(this.course)
			this.setEditModalCourse()
		}
	}
}
</script>

<style lang="scss" scoped>
	.title{
		color: $primary-dark;
	}
</style>
