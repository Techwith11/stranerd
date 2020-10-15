<template>
	<div class="body w-100 d-flex justify-content-center align-items-center flex-wrap p-md-6">
		<div class="content p-3 p-md-5 shadow-sm">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.body{
	min-height: 100vh;
	//background: url('../assets/images/auth/bg.jpg') center no-repeat;
	background: lighten($primary-gold, 35%);
	background-size: cover;
	padding: .25rem;
}
.content{
	max-width: 720px;
	background: $white;
	border-radius: .75rem;
}
</style>
