<template>
	<div class="position-relative">
		<div class="center">
			<loading :size="3.5" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.center{
		background: $blackTransparent;
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10000000000000000;
	}
</style>
