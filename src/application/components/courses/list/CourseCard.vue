<template>
	<div class="mb-5 shadow-sm white">
		<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">
			<img :src="course.imageLink" class="card-img-top w-100" alt="">
		</router-link>
		<div class="mt-3 p-3">
			<h4 class="card-title">
				<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">{{ course.title }}</router-link>
			</h4>
			<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">
				<p>{{ course.trimmedDescription }}</p>
			</router-link>
			<p class="small text-capitalize">{{ course.subject }} : {{ course.module }}</p>
			<div class="d-flex align-items-center">
				<span class="small">Posted on: {{ course.createdDate }}</span>
				<div class="ml-auto" v-if="isAdmin">
					<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
					<a class="text-danger" @click.prevent="deleteCourse">
						<i class="fas mr-1" :class="delLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
						<span>Delete</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from '@vue/composition-api'
	import { CourseEntity } from '@root/modules/courses/domain/entities/course'
	import store from '@/store'
	import { useDeleteCourse } from '@/usecases/courses/useCourses'
    export default defineComponent({
        props: {
            course: {
                type: CourseEntity,
                required: true
            }
        },
		setup(props){
			const { loading: delLoading, deleteCourse } = useDeleteCourse(props.course)
			return {
				isAdmin: computed(() => store.getters.isAdmin),
				deleteCourse, delLoading,
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
