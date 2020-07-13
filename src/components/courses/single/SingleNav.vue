<template>
	<div id="background">
		<div class="container">
			<ul class="nav justify-content-center">
				<li class="nav-item">
					<router-link class="nav-link" :to="`${$route.path}`">Overview</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" :to="`${$route.path}?tab=documents`">Documents</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" :to="`${$route.path}?tab=discussions`">Discussions</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	#background{
		background: $gradient;
	}
	a{
		color: $text-black;
		font-size: 0.75rem;
		padding: 0.5rem;
	}
	.router-link-exact-active{
		color: $white;
		border-bottom: none !important;
	}
	@media screen and (min-width:768px){
		a{
			font-size: 1rem;
		}
	}
</style>
