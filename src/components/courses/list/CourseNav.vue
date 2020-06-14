<template>
	<div class="accent-background">
		<div class="container">
			<ul class="nav scrolling-nav">
				<li class="nav-item">
					<router-link class="nav-link" to="/courses">All</router-link>
				</li>
				<li class="nav-item" v-for="subject in getAllSubjects" :key="subject['.key']">
					<router-link class="nav-link" :to="`/courses?tab=${subject.name}`">{{ subject.name }}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: mapGetters(['getAllSubjects'])
	}
</script>