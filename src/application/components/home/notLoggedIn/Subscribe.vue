<template>
	<div id="background">
		<div class="container d-flex">
			<div>
				<h5>Subscribe to our Newsletter</h5>
				<p>Get exclusive discounts and latest news delivered to your inbox for free!</p>
			</div>
			<div class="d-flex flex-column">
				<input type="email" class="form-control" placeholder="Email address" aria-label="Email address">
				<div class="">
					<button class="white-primary">Subscribe</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
    #background{
        background: $white;
        padding: 4rem 0;
        color: $text-black;
    }
    input{
        border-radius: 50rem;
    }
</style>
