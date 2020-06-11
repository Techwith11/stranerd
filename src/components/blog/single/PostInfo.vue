<template>
	<div>
		<img :src="post.image.link" alt="" class="w-100 my-4">
		<h3>{{ post.title }}</h3>
		<div v-html="post.body" class="editor-container"></div>
		<p class="text-muted my-3">Uploaded {{ getDateOrTime }}</p>
		<div class="my-3 d-flex" v-if="isAdmin">
			<button class="btn-warning mr-2"><i class="fas fa-pen mr-2"></i>Edit</button>
			<button class="btn-danger" @click="removePost"><i class="fas fa-trash mr-2"></i>Delete</button>
		</div>
		<p class="my-3 text-muted">
			Related Tags: <span v-for="tag in post.tags" :key="tag" class="mr-2 small"><i class="fas fa-circle mr-1" :class="getRandomColor()"></i>{{ tag }}</span>
		</p>
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
		methods: {
			...mapActions(['deleteBlogPost','setEditMeta','setEditModalBlog']),
			getRandomColor(){
				let colors = [
					'text-primary','text-secondary','text-success','text-danger',
					'text-warning','text-info','text-dark',
				]
				return colors[Math.floor(Math.random() * colors.length)]
			},
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
						await this.$router.push('/blog')
						new window.Toast({ icon: 'success', title: 'Post deleted successfully' })
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			},
			async openEditModal(){
				this.setEditMeta(this.question)
				this.setEditModalBlog()
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
		}
	}
</script>