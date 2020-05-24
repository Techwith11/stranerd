<template>
	<div class="accent-background">
		<div class="container">
			<ul class="nav scrolling-nav">
				<li class="nav-item">
					<router-link class="nav-link" to="/admins/questions">All</router-link>
				</li>
				<li class="nav-item" v-for="subject in subjects" :key="subject['.key']">
					<router-link class="nav-link" :to="`/admins/questions?tab=${subject.name}`">{{ subject.name }}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			subjects: {
				required: true,
				type: Array
			}
		}
	}
</script>

