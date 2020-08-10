<template>
	<form class="my-3" @submit.prevent="createPost">
		<div class="form-group my-3">
			<h6>Title</h6>
			<input type="text" class="form-control" placeholder="eg What is the result of integrating 2x" v-model="factory.title"
				:class="{'is-invalid': factory.errors.title,'is-valid': factory.isValid('title')}">
			<small class="small text-danger d-block" v-if="factory.errors.title">{{ factory.errors.title }}</small>
			<small class="small text-muted">One quick sentence summary of your question</small>
		</div>
		<div class="form-group my-3">
			<h6>Body</h6>
			<editor :model.sync="factory.body" path='posts/body'
				:valid="factory.isValid('body')" :error="factory.errors.body" placeholder=""
			/>
			<small class="small text-muted">Include all information necessary for someone to answer your question</small>
		</div>
		<div class="form-group my-3">
			<h6>Related Subject</h6>
			<select class="form-control text-capitalize" v-model="factory.subject" :class="{'is-invalid': factory.errors.subject, 'is-valid': factory.isValid('subject')}">
				<option value="" disabled>Please select a subject</option>
				<option :value="subject.name" v-for="subject in subjects" :key="subject['.key']">{{ subject.name }}</option>
			</select>
			<small class="small text-danger d-block" v-if="factory.errors.subject">{{ factory.errors.subject }}</small>
		</div>
		<div class="form-group my-3">
			<h6>Related Module</h6>
			<select class="form-control text-capitalize" v-model="factory.module" :class="{'is-invalid': factory.errors.module, 'is-valid': factory.isValid('module')}">
				<option value="" disabled>Please select a {{ factory.subject ? 'module' : 'subject first' }}</option>
				<option :value="module.name" v-for="module in modules" :key="module.name">{{ module.name }}</option>
			</select>
			<small class="small text-danger d-block" v-if="factory.errors.module">{{ factory.errors.module }}</small>
		</div>
		<div class="form-group my-3">
			<h6>Tags</h6>
			<input type="text" placeholder="eg differentiation calculus" v-model="tag" class="form-control">
			<p class="my-2">
				<span v-for="tag in factory.tags" @click="removeTag(tag)" class="bg-primary p-1 mr-1 cursor-pointer" :key="tag">
					<span class="text-white">{{ tag }} </span>
					<span class="text-danger ml-1">&times;</span>
				</span>
			</p>
			<small class="small text-muted d-block">Add at least 3 relevant tags to your question, separated by spaces</small>
			<small class="small text-danger" v-if="factory.errors.tags">{{ factory.errors.tags }}</small>
		</div>
		<div class="d-flex justify-content-end">
			<button class="btn" type="submit" :class="factory.valid ? 'btn-success text-white' : 'btn-gray'"
				:disabled="loading || !factory.valid" v-if="isLoggedIn">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Post question</span>
			</button>
			<button class="btn-success" @click="login" v-else>
				Login to continue
			</button>
		</div>
	</form>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { useCreatePost } from '@/usescases/posts/posts'
	export default defineComponent({
		name: 'CreatePost',
		setup(){
			const {
				factory, tag, splitTag, removeTag,
				loading, subjects, modules,
				createPost,
				isLoggedIn, login
			} = useCreatePost()
			return {
				factory, tag, splitTag, removeTag,
				loading, subjects, modules,
				createPost,
				isLoggedIn, login
			}
		}
	})
</script>
