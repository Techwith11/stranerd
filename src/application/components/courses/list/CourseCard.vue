<template>
	<div class="mb-5 shadow-sm white p-3">
		<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">
			<img :src="course.imageLink" class="card-img-top w-100" alt="">
		</router-link>
		<div class="mt-3">
			<h5 class="card-title">
				<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">{{ course.title }}</router-link>
			</h5>
			<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">
				<div v-html="course.description"  class="small editor-container"></div>
			</router-link>
			<p class="small text-capitalize">{{ course.subject }} : {{ course.module }}</p>
			<div class="d-flex align-items-center">
				<span class="small">Posted on: {{ course.createdDate }}</span>
				<div class="ml-auto" v-if="isAdmin">
					<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
					<a class="text-danger" @click.prevent="deleteCourse"><i class="fas fa-trash mr-1"></i>Delete</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from '@vue/composition-api'
	import { CourseEntity } from '@root/modules/courses/domain/entities/course'
	import store from '@/store'
	import { Notify, Alert } from '@/config/notifications'
    export default defineComponent({
        props: {
            course: {
                type: CourseEntity,
                required: true
            }
        },
		setup(props){
			return {
				isAdmin: computed(() => store.getters.isAdmin),
				deleteCourse: async () => {
					try{
						let result = await Alert({
							title: 'Delete course',
							text: 'Are you sure you want to delete this course? This cannot be undone',
							icon: 'info',
							confirmButtonText: 'Delete'
						})
						if (result.value) {
							await store.dispatch('deleteCourse',props.course.id)
							await Notify({ icon: 'success', title: 'Course deleted successfully' })
						}
					}catch(error){ await Notify({ icon: 'error', title: error.message }) }
				},
				openEditModal: () => {
					store.dispatch('setEditMeta', props.course)
					store.dispatch('setEditModalCourse')
				}
			}
		}
    })
</script>

<style lang="scss" scoped>
	a{
		color: $text-black;
	}
</style>
