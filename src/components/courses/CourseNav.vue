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
		padding: 0.5rem 0;
		background: $primary;
	}
	.nav-link{
		color: $text-black;
	}
	.router-link-exact-active{
		color: $white;
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

