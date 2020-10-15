<template>
	<div class="my-3">
		<h3>{{ post.title }}</h3>
		<p>
			<span class="text-capitalize">{{ post.module }}, </span>
			<span class="text-capitalize">{{ post.subject }}</span>
		</p>
		<div class="d-flex align-items-center">
			<img :src="user.image" class="profile-image" id="ownerImage" alt="">
			<div>
				<p class="mb-0"><router-link class="text-white" :to="`/users/${user.id}`">{{ user.name }}</router-link></p>
				<p class="mb-0">{{ post.createdDate }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PostEntity } from '@modules/posts/domain/entities/post'
import { UserEntity } from '@modules/users/domain/entities/user'
export default defineComponent({
	props: {
		post: {
			required: true,
			type: PostEntity
		},
		user: {
			required: true,
			type: UserEntity
		}
	}
})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 50px; height: 50px; }
</style>
