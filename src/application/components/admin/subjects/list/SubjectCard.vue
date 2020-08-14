<template>
	<div class="my-3 alert alert-light shadow">
		<div class="d-flex justify-content-between align-items-center my-3 cursor-pointer">
			<h4 class="text-capitalize" @click.prevent="toggleCollapse">{{ subject.name }}</h4>
			<div class="d-flex my-2 justify-content-end align-items-center" id="main">
				<a @click.prevent="openSubjectEditModal" class="mr-3"><i class="fas fa-pen text-warning"></i></a>
				<a @click.prevent="deleteSubject" class="text-danger mr-3">
					<i class="fas" :class="deleteLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
				</a>
				<a @click.prevent="toggleCollapse"><i class="fas" :class="show ? 'fa-angle-up' : 'fa-angle-down'"></i></a>
			</div>
		</div>
		<div class="collapse" :id="subject.id">
			<ul class="list-group">
				<li class="list-group-item list my-1 d-flex align-items-center"
					v-for="module in subject.modules" :key="module.name">
					<img v-if="module.image" height="40px" :src="module.image" alt="">
					<h6 class="mb-0 text-capitalize lead">{{ module.name }}</h6>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from '@vue/composition-api'
	import store from '@/store'
	import { setCurrentEditingSubject, useDeleteSubject } from '@/usecases/courses/useSubjects'
	import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'
	export default defineComponent({
		props: {
			subject: {
				required: true,
				type: SubjectEntity
			}
		},
		setup(props){
			const { loading: deleteLoading, deleteSubject } = useDeleteSubject(props.subject)
			const show = ref(false)
			const toggleCollapse = () => {
				document.getElementById(props.subject.id)!.classList.toggle('show')
				show.value = !show.value
			}
			const openSubjectEditModal = () => {
				setCurrentEditingSubject(props.subject)
				store.dispatch('setEditModalSubject')
			}
			return {
				deleteLoading, deleteSubject,
				show, toggleCollapse, openSubjectEditModal
			}
		}
	})
</script>

<style lang="scss" scoped>
	#main{
		i{
			font-size: 1.25rem;
		}
	}
</style>
