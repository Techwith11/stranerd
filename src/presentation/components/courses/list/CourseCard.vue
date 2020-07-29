<template>
	<div class="mb-5 shadow-sm white p-3">
		<router-link :to="`/courses/${course.subject}/${course.module}/${course['.key']}`">
			<img :src="course.image.link" class="card-img-top w-100" alt="">
		</router-link>
		<div class="mt-3">
			<h5 class="card-title">
				<router-link :to="`/courses/${course.subject}/${course.module}/${course['.key']}`">{{ course.title }}</router-link>
			</h5>
			<router-link :to="`/courses/${course.subject}/${course.module}/${course['.key']}`">
				<div v-html="course.description"  class="small editor-container"></div>
			</router-link>
			<p class="small text-capitalize">{{ course.subject }} : {{ course.module }}</p>
			<p class="small">Updated: {{ course.dates.updatedAt | getDate }}</p>
			<div class="my-3" v-if="isAdmin">
				<a class="mr-3 btn btn-sm btn-warning text-white" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
				<a class="mr-3 btn btn-sm btn-danger text-white" @click.prevent="removePost"><i class="fas fa-trash mr-1"></i>Delete</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
    export default {
        props: {
            course: {
                type: Object,
                required: true
            }
        },
		filters: {
			getDate(date){
				if(date.seconds){
					return new Date(date.seconds * 1000).toDateString()
				}else{
					return new Date().toDateString()
				}
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
	a{
		color: $text-black;
	}
</style>
