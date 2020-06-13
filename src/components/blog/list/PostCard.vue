<template>
	<div class="card my-3">
		<img :src="post.image.link" class="card-img-top" alt="">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
			<p class="card-text">{{ post.description }}</p>
			<span class="d-block my-2">Uploaded {{ getDateOrTime }}</span>
			<router-link :to="`/blog/${post['.key']}`" class="btn btn-primary" target="_blank">View article</router-link>
			<div class="my-3" v-if="isAdmin">
				<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
				<a class="mr-3 text-danger" @click.prevent="removePost"><i class="fas fa-trash mr-1"></i>Delete</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		props: {
			post: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['isAdmin']),
			getDateOrTime(){
				let date = new Date(this.post.dates.createdAt.seconds * 1000)
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return date.toTimeString().slice(0,5)
				}else if(date > yesterday){
					return 'Yesterday'
				}else{
					return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			}
		},
		methods: {
			...mapActions(['deleteBlogPost','setEditMeta','setEditModalBlog']),
			async removePost(){
				try{
					let result = await new window.SweetAlert({
						title: 'Delete post',
						text: 'Are you sure you want to delete this post? This cannot be undone',
						icon: 'info',
						showCancelButton: true,
						cancelButtonColor: '#3085d6',
						confirmButtonColor: '#d33',
						confirmButtonText: 'Delete'
					})
					if (result.value) {
						await this.deleteBlogPost(this.post['.key'])
						window.Fire.$emit('BlogPostDeleted', this.post)
						new window.Toast({ icon: 'success', title: 'Post deleted successfully' })
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			},
			async openEditModal(){
				this.setEditMeta(this.post)
				this.setEditModalBlog()
			}
		}
	}
</script>