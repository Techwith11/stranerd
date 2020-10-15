<template>
	<div>
		<div id="mainCarousel" class="carousel slide carousel-fade" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#mainCarousel" data-slide-to="0" class="active d-none d-sm-inline"></li>
				<li data-target="#mainCarousel" data-slide-to="1" class="d-none d-sm-inline"></li>
				<li data-target="#mainCarousel" data-slide-to="2" class="d-none d-sm-inline"></li>
			</ol>
			<div class="carousel-inner">
				<div class="carousel-item active" data-interval="3000">
					<img src="@application/assets/images/slides_1.jpg" class="d-block w-100" alt="">
					<div class="carousel-caption">
						<h1 class="font-weight-bold cta">Get Access to Unlimited Educational Resources. Anywhere, Anytime!</h1>
						<p class="subhead">Premium access to loads of resources ranging from courses, materials, tests and more.</p>
						<button class="btn btn-gold-dark px-4"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
					</div>
				</div>
				<div class="carousel-item" data-interval="3000">
					<img src="@application/assets/images/slides_2.jpg" class="d-block w-100" alt="">
					<div class="carousel-caption">
						<h1 class="font-weight-bold cta">Get Access to Unlimited Educational Resources. Anywhere, Anytime!</h1>
						<p class="subhead">Premium access to loads of resources ranging from courses, materials, tests and more.</p>
						<button class="btn btn-gold-dark px-4"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
					</div>
				</div>
				<div class="carousel-item" data-interval="3000">
					<img src="@application/assets/images/slides_3.jpg" class="d-block w-100" alt="">
					<div class="carousel-caption">
						<h1 class="font-weight-bold cta">Get Access to Unlimited Educational Resources. Anywhere, Anytime!</h1>
						<p class="subhead">Premium access to loads of resources ranging from courses, materials, tests and more.</p>
						<button class="btn btn-gold-dark px-4"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
					</div>
				</div>
			</div>
		</div>
		<div class="d-sm-none p-4 text-center cta-sm bg-gold-light">
			<h1 class="header">Get Access to Unlimited Educational Resources. Anywhere, Anytime!</h1>
			<p class="subhead px-2">Premium access to loads of resources ranging from courses, materials, tests and more.</p>
			<button class="btn btn-gold-dark px-4"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
		</div>
		<div class="bg-gold" style="height: 1rem;"></div>
	</div>
</template>

<style lang="scss" scoped>
    @media (max-width: $sm) {
        .carousel-caption{ display: none !important; }
    }
    @media (min-width: $sm) {
        //img{ min-height: 50vh; }
        .carousel-indicators li {
            background: #FFFFFFAA;
            border-radius: 50rem;
            width: 1rem;
            height: 1rem;
            box-sizing: border-box !important;
        }
        .carousel-caption{
            left: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            display: flex;
            padding: 0 0.5rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #00000044;
        }
    }

    @media (min-width: $md){
        .carousel-caption{ padding: 0 8rem; }
    }
    .cta-sm{
        h1{ font-size: 1.5rem; }
    }
    @media (min-width: 400px) {
        .cta-sm{
            h1{ font-size: 1.75rem; }
        }
    }
</style>
