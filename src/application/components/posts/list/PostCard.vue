<template>
	<div class="mb-4 white">
    <div class="d-flex align-items-center my-3">
      <img :src="user.image" alt="" class="profile-image" id="ownerImage">
      <div>
        <h6 class="mb-0">{{ user.name }}</h6>
        <p class="mb-0 small">Posted {{ post.createdDate }}</p>
      </div>
    </div>
		<h5 class="card-title font-weight-500"><router-link class="text-dark" :to="`/posts/${post.id}`">{{ post.title }}</router-link></h5>
		<p class="card-subtitle mb-2 text-muted small">
			<span class="text-capitalize">{{ post.module }}, </span>
			<span class="text-capitalize">{{ post.subject }}</span>
		</p>
		<p class="card-text">{{ post.trimmedBody }}</p>
		<router-link :to="`/posts/${post.id}`" class="card-link">View all answers</router-link>
	</div>
</template>

<script lang="ts">
import { PostEntity } from '@modules/posts/domain/entities/post'
import { defineComponent, reactive, computed } from '@vue/composition-api'
import { fetchUser } from '@application/usecases/users/users'
export default defineComponent({
	props: {
		post: {
			type: PostEntity,
			required: true
		}
	},
	setup(props){
		const state = reactive({ user: {} })
		fetchUser(props.post.userId).then((u) => state.user = u as object)
		return { user: computed(() => state.user) }
	}
})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 40px; height: 40px; }
</style>
