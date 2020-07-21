<template>
	<div id="sidebar" class="small">
		<router-link class="d-flex flex-column align-items-center" to="/posts">
			<img src="@/assets/images/sidebar/posts.svg" alt="">
			<p>Posts</p>
		</router-link>
		<router-link class="d-flex flex-column align-items-center" to="/sessions">
			<img src="@/assets/images/sidebar/sessions.svg" alt="">
			<p>Sessions</p>
		</router-link>
		<router-link class="d-flex flex-column align-items-center" to="/courses">
			<img src="@/assets/images/sidebar/courses.svg" alt="">
			<p>Courses</p>
		</router-link>
		<router-link class="d-flex flex-column align-items-center" to="/tutors">
			<img src="@/assets/images/sidebar/tutors.svg" alt="">
			<p>Tutors</p>
		</router-link>
		<router-link class="d-flex flex-column align-items-center" to="/shop">
			<img src="@/assets/images/sidebar/shop.svg" alt="">
			<p>Shop</p>
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
	#sidebar{
		padding: 2rem 0;
		background: $primary;
		width: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img{
		width: 30px;
		height: 30px;
		margin: 0 0 0.25rem;
	}
	a{
		color: $text-black;
	}
</style>
