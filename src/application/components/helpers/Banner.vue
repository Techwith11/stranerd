<template>
	<div class="position-relative">
		<div class="head">
			<div class="overlay"></div>
			<div style="z-index:1;">
				<slot>
					<h1>Strive For <span class="font-weight-bold">Progress</span> Not <span class="font-weight-bold">Perfection</span></h1>
				</slot>
			</div>
			<div class="custom-divider">
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M1200 0L0 0 892.25 114.72 1200 0z" class="shape-fill"></path>
				</svg>
			</div>
		</div>
	</div>
</template>

 <style lang="scss" scoped>
.head{
	background: url('../../assets/images/header.jpg') no-repeat center center;
	background-size: cover;
	color: $white;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5rem 2rem;
	min-height: 300px;
	position: relative;
}
.overlay{
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	top: 0;
	background: rgba($accent, 0.6);
}
.custom-divider {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
	svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		transform: rotateY(180deg);
		height: 30px;
	}
	@media (min-width: $lg){ svg{ height: 40px; } }
	.shape-fill {
		fill: #FFFFFF;
	}
}
 </style>
