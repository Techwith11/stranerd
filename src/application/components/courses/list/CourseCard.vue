<template>
	<div>
		<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">
			<img :src="course.imageLink" class="card-img-top w-100" alt="">
		</router-link>
		<div class="mt-3">
			<h4 class="card-title">
				<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">{{ course.title }}</router-link>
			</h4>
			<p class="small text-capitalize">{{ course.subject }}, {{ course.module }}</p>
			<router-link :to="`/courses/${course.subject}/${course.module}/${course.id}`">
				<p v-html="course.trimmedDescription"></p>
			</router-link>
			<div class="d-flex align-items-center">
				<span class="small">Posted {{ course.createdDate }}</span>
				<div class="ml-auto" v-if="isAdmin">
					<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
					<a class="text-danger" @click.prevent="deleteCourse">
						<loading class="mr-1" v-if="delLoading" />
						<i class="fas mr-1 fa-trash" v-else></i>
						<span>Delete</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { setCurrentEditingCourse, useDeleteCourse } from '@application/usecases/courses/courses'
import { useStore } from '@application/usecases/store'
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
			isAdmin: useStore().auth.isAdmin,
			deleteCourse, delLoading,
			openEditModal: () => {
				setCurrentEditingCourse(props.course)
				useStore().modals.setEditModalCourse()
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
