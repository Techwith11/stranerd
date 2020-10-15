<template>
	<div class="position-relative">
		<div class="center">
			<i class="fas fa-3x fa-spinner fa-spin text-info"></i>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.center{
    background: $blackTransparent;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000000000000000;
	}
</style>
