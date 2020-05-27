<template>
	<div class="card my-3">
		<img :src="post.image.link" class="card-img-top" alt="">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
			<p class="card-text">{{ post.description }}</p>
			<span class="d-block my-2">Uploaded {{ getDateOrTime }}</span>
			<router-link :to="`/blog/${post['.key']}`" class="btn btn-primary">View article</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			post: {
				required: true,
				type: Object
			}
		},
		computed: {
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