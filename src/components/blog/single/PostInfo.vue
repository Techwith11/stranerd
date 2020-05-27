<template>
	<div>
		<img :src="post.image.link" alt="" class="w-100 my-4">
		<h3>{{ post.title }}</h3>
		<div v-html="post.body" class="editor-container"></div>
		<p class="text-muted my-3">Uploaded {{ getDateOrTime }}</p>
		<p class="my-3 text-muted">
			Related Tags: <span v-for="tag in post.tags" :key="tag" class="mr-2 small"><i class="fas fa-circle mr-1" :class="getRandomColor()"></i>{{ tag }}</span>
		</p>
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
		methods: {
			getRandomColor(){
				let colors = [
					'text-primary','text-secondary','text-success','text-danger',
					'text-warning','text-info','text-dark',
				]
				return colors[Math.floor(Math.random() * colors.length)]
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