<template>
	<ul class="nav justify-content-center">
		<li class="nav-item">
			<router-link class="nav-link" to="/courses">All</router-link>
		</li>
		<li class="nav-item">
			<router-link class="nav-link" to="/courses?tab=maths">Maths</router-link>
		</li>
		<li class="nav-item">
			<router-link class="nav-link" to="/courses?tab=physics">Physics</router-link>
		</li>
		<li class="nav-item">
			<router-link class="nav-link" to="/courses?tab=chemistry">Chemistry</router-link>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	@import '../../style/index';
	ul{
		padding: 1.5rem 0 0;
	}
	.nav-link{
		color: $text-black !important;
	}
	.router-link-exact-active{
		background: $primary;
		color: $white !important;
	}
	@media screen and (max-width: 767px){
		ul{
			font-size: 0.9rem;
			padding: 1.25rem 0 0;
		}
		a{
			padding: 0.75rem;
		}
	}
	@media screen and (max-width: 575px){
		ul{
			font-size: 0.8rem;
			padding: 1rem 0 0;
		}
		a{
			padding: 0.5rem;
		}
	}
</style>

