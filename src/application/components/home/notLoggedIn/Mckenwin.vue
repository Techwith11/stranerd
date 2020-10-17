<template>
	<div>
		<div class="bg-gold" style="height: 1rem;"></div>
		<div id="background">
			<div id="overlay">
				<div class="container text-white">
					<h2>Study In Europe</h2>
					<p class="lead mb-3">Get admission to study in the best universities in Europe without IELTS or TOEFL</p>
					<a class="btn btn-lg btn-outline-light" href="https://mckenwin.com/" target="_blank">Secure your admission now</a>
				</div>
			</div>
		</div>
		<div class="container my-4 d-flex justify-content-center align-items-center flex-column flex-md-row">
			<h3 class="col-md-6 text-left text-md-right">Secure your admission to study abroad</h3>
			<div class="col-md-6">
				<p>
					McKenwin is an International Education Agency founded in 2014 with over 1583 successful student placements and Visa counseling service experience.
					We have represented and placed students into Bachelor study in Europe without IELTS as well as Masters degree in Europe without IELTS at top and world-ranked institutions around the world mainly in Cyprus,Turkey and other European countries.
				</p>
			</div>
		</div>
		<div class="bg-gold" style="height: 1rem;"></div>
	</div>
</template>

<style lang="scss" scoped>
    #background{
		background-size: cover;
		background: url('../../../assets/images/mckenwin.jpg') center;
	}
    #overlay{
        padding: 5rem 0;
		text-align: center;
        background: linear-gradient(180deg, rgba(58,52,226,0.93) 0%, rgba(73,108,220,0.7) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
	@media (max-width: 540px){
		h3{ font-size: 1.5rem; }
	}
	@media (max-width: 360px){
		h3{ font-size: 1.25rem; }
	}
</style>
