<template>
	<div class="">
		<video :src="course.video.link" class="w-100 mb-0" controls v-if="course.hasVideo"></video>
		<img :src="course.imageLink" alt="" class="w-100" v-else>
		<div class="py-2 d-flex justify-content-center align-items-center">
			<h4 class="mb-0">{{ course.title }}</h4>
			<div class="ml-3" v-if="isAdmin">
				<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
				<a class="text-danger" @click.prevent="deleteCourse">
					<i class="fas mr-1" :class="delLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
					<span>Delete</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { setCurrentEditingCourse, useDeleteCourse } from '@/usecases/courses/courses'
import { useStore } from '@/usecases/store'
export default defineComponent({
	props: {
		course: {
			required: true,
			type: CourseEntity
		}
	},
	setup(props){
		const { loading: delLoading, deleteCourse } = useDeleteCourse(props.course)
		return {
			delLoading, deleteCourse,
			isAdmin: useStore().auth.isAdmin,
			openEditModal: () => {
				setCurrentEditingCourse(props.course)
				useStore().modals.setEditModalCourse()
			}
		}
	}
})
</script>
