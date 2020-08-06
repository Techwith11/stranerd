<template>
	<div class="mb-4 white shadow-sm p-3">
		<h5 class="card-title font-weight-bold"><router-link class="text-black-50" :to="`/posts/${post.id}`">{{ post.title }}</router-link></h5>
		<p class="card-subtitle mb-2 text-muted small">
			<span class="text-capitalize">{{ post.module }}, </span>
			<span class="text-capitalize">{{ post.subject }}</span>
		</p>
		<p class="card-text">{{ post.trimmedBody }}</p>
		<router-link :to="`/posts/${post.id}`" class="card-link">See all replies</router-link>
		<div class="d-flex align-items-center my-3">
			<img :src="getImageLink" alt="" class="profile-image" id="ownerImage">
			<div>
				<h6 class="mb-0">{{ getName }}</h6>
				<p class="mb-0 small">Posted {{ post.createdDate }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { firestore } from '@/config/firebase'
	import PostEntity from '@root/modules/posts/domain/entities/posts'
    import { computed, defineComponent, reactive } from '@vue/composition-api'
    import store from '@/store'
	export default defineComponent({
		props: {
			post: {
                type: PostEntity,
                required: true
			}
		},
		setup(props){
			let user: any = reactive({})
            firestore.collection('users').doc(props.post.userId).get().then(doc => user = doc.data())
            const getName = computed(() => user.bio?.name ?? '')
            const getImageLink = computed(() => user.bio?.image?.link ?? store.getters.getDefaultImage)
            return { user, getName, getImageLink }
		}
	})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 40px; height: 40px; }
</style>
