<template>
	<div class="my-3 alert alert-secondary">
		<div class="d-flex justify-content-between align-items-center my-3 cursor-pointer" @click.prevent="toggleCollapse">
			<h4 class="text-capitalize">{{ subject.name }}</h4>
			<span><i class="fas" :class="show ? 'fa-angle-up' : 'fa-angle-down'"></i></span>
		</div>
		<div class="collapse" :id="subject.id">
			<ul class="list-group">
				<li class="list-group-item my-1 d-flex justify-content-between align-items-center"
					v-for="module in subject.modules" :key="module.name">
					<h6 class="mb-0 text-capitalize">{{ module.name }}</h6>
				</li>
			</ul>
			<div class="d-flex my-2 justify-content-end align-items-center" id="main">
				<a @click.prevent="openSubjectEditModal" class="mr-3"><i class="fas fa-plus text-success"></i></a>
				<a @click.prevent="openSubjectEditModal" class="mr-3"><i class="fas fa-pen text-warning"></i></a>
				<a @click.prevent="deleteSubject" class="text-danger mr-3">
					<i class="fas" :class="deleteLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from '@vue/composition-api'
	import store from '@/store'
	import { useDeleteSubject } from '@/usecases/courses/useSubjects'
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
				store.dispatch('setEditMeta', props.subject)
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
			font-size: 1.5rem;
		}
	}
</style>
