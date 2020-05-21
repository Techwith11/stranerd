<template>
	<div id="bg">
		<div class="container">
			<ul class="nav justify-content-center">
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

<style lang="scss" scoped>
	@import '../../../../style/index';
	#bg{
		background: $accent;
	}
	ul{
		padding: 0.5rem 0;
	}
	.nav-link{
		color: $text-black;
	}
	.router-link-exact-active{
		color: $white;
		background: $accent;
		border: none;
	}
	@media screen and (max-width: 767px){
		ul{
			font-size: 0.9rem;
			padding: 0.5rem 0;
		}
		a{
			padding: 0.75rem;
		}
	}
	@media screen and (max-width: 575px){
		ul{
			font-size: 0.8rem;
			padding: 0.5rem 0;
		}
		a{
			padding: 0.5rem;
		}
	}
</style>

