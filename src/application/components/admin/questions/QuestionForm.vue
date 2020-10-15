<template>
	<div>
		<page-loading v-if="subjectLoading" />
		<template v-else>
			<slot name="title"><h4>Title</h4></slot>
			<form class="mx-2" @submit.prevent="submit">
				<div class="form-group my-3">
					<h6>Question</h6>
					<editor :model.sync="factory.title" path='tests/tutors/tests/title'
						:valid="factory.isValid('title')" :error="factory.errors.title" placeholder="Question body"
					/>
				</div>
				<div class="form-group my-3">
					<h6>Level</h6>
					<input class="form-control" type="number" min="1" placeholder="Level" v-model="factory.level"
						:class="{'is-invalid': factory.errors.level, 'is-valid': factory.isValid('level')}">
					<small class="small text-danger d-block" v-if="factory.errors.level">{{ factory.errors.level }}</small>
				</div>
				<div class="form-group my-3">
					<select class="form-control text-capitalize" v-model="factory.subject"
						:class="{'is-invalid': factory.errors.subject, 'is-valid': factory.isValid('subject')}">
						<option value="" disabled>Under what subject</option>
						<option :value="subject.name" v-for="subject in subjects" :key="subject.name">{{ subject.name }}</option>
					</select>
					<small class="small text-danger d-block" v-if="factory.errors.subject">{{ factory.errors.subject }}</small>
				</div>
				<div class="form-group my-3">
					<select class="form-control text-capitalize" v-model="factory.module"
						:class="{'is-invalid': factory.errors.module, 'is-valid': factory.isValid('module')}">
						<option value="" disabled>Please select a {{ factory.subject ? 'module' : 'subject first' }}</option>
						<option :value="module.name" v-for="module in modules" :key="module.name">{{ module.name }}</option>
					</select>
					<small class="small text-danger d-block" v-if="factory.errors.module">{{ factory.errors.module }}</small>
				</div>
				<hr>
				<div class="form-group my-3">
					<h6>Option A</h6>
					<input class="form-control" placeholder="Option A" v-model="factory.a"
						:class="{'is-invalid': factory.errors.a, 'is-valid': factory.isValid('a')}">
					<small class="small text-danger d-block" v-if="factory.errors.a">{{ factory.errors.a }}</small>
				</div>
				<div class="form-group my-3">
					<h6>Option B</h6>
					<input class="form-control" placeholder="Option B" v-model="factory.b"
						:class="{'is-invalid': factory.errors.b, 'is-valid': factory.isValid('b')}">
					<small class="small text-danger d-block" v-if="factory.errors.b">{{ factory.errors.b }}</small>
				</div>
				<div class="form-group my-3">
					<h6>Option C</h6>
					<input class="form-control" placeholder="Option C" v-model="factory.c"
						:class="{'is-invalid': factory.errors.c, 'is-valid': factory.isValid('c')}">
					<small class="small text-danger d-block" v-if="factory.errors.c">{{ factory.errors.c }}</small>
				</div>
				<div class="form-group my-3">
					<h6>Option D</h6>
					<input class="form-control" placeholder="Option D" v-model="factory.d"
						:class="{'is-invalid': factory.errors.d, 'is-valid': factory.isValid('d')}">
					<small class="small text-danger d-block" v-if="factory.errors.d">{{ factory.errors.d }}</small>
				</div>
				<div class="form-group my-3">
					<h6>Correct Option</h6>
					<select class="form-control text-capitalize" v-model="factory.answer"
						:class="{'is-invalid': factory.errors.module, 'is-valid': factory.isValid('answer')}">
						<option value="" disabled>Select the correct option</option>
						<option :value="option" v-for="option in ['a','b','c','d']" :key="option">{{ option }}</option>
					</select>
					<small class="small text-danger d-block" v-if="factory.errors.c">{{ factory.errors.c }}</small>
				</div>
				<hr>
				<div class="d-flex justify-content-end my-3">
					<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
						<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
						<span><slot name="buttonText">Submit</slot></span>
					</button>
				</div>
			</form>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { QuestionFactory } from '@modules/tests/domain/factories/question'
import { useSubjects } from '@application/usecases/courses/subjects'
export default defineComponent({
	props: {
		factory: {
			type: QuestionFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		}
	},
	setup(props){
		const { subjects, loading: subjectLoading } = useSubjects()
		const modules = computed(() => subjects.value.find((s) => s.name === props.factory.subject)?.modules ?? [])
		return { subjectLoading, modules, subjects }
	}
})
</script>
