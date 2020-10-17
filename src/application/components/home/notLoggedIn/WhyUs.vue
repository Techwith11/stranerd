<template>
	<div>
		<div class="container my-8 text-center">
			<div class="d-flex flex-wrap row justify-content-center">
				<div class="col-sm-6 col-md-4 mb-7">
					<div class="icons">
						<img src="@application/assets/images/icons/Unlimited Access.svg" alt="" />
					</div>
					<h3 class="icon-title">Unlimited Access</h3>
					<p class="icon-subtitle">One subscription, unlimited access.</p>
				</div>
				<div class="col-sm-6 col-md-4 mb-7">
					<div class="icons">
						<img src="@application/assets/images/icons/Expert Teacher.svg" alt="" />
					</div>
					<h3 class="icon-title">Expert Teachers</h3>
					<p class="icon-subtitle">Learn from expert teachers who are passionate about teaching.</p>
				</div>
				<div class="col-sm-6 col-md-4 mb-7">
					<div class="icons">
						<img src="@application/assets/images/icons/Study Anywhere.svg" alt="" />
					</div>
					<h3 class="icon-title">Study Anywhere</h3>
					<p class="icon-subtitle">Improve your academic performance with on-the-spot access to course materials no matter your location.</p>
				</div>
				<div class="col-sm-6 col-md-4 mb-7">
					<div class="icons">
						<img src="@application/assets/images/icons/Test Preps.svg" alt="" />
					</div>
					<h3 class="icon-title">Test Preps</h3>
					<p class="icon-subtitle">Identify your strengths and improve your weaknesses with our concise tests.</p>
				</div>
				<div class="col-sm-6 col-md-4 mb-7">
					<div class="icons">
						<img src="@application/assets/images/icons/Post Questions.svg" alt="" />
					</div>
					<h3 class="icon-title">Ask questions</h3>
					<p class="icon-subtitle">Asks questions for free and get answers from our expert tutors.</p>
				</div>
			</div>
		</div>
		<div class="bg-accent" style="height: 1rem;"></div>
	</div>
</template>

<style lang="scss" scoped>
    .icons{
        height: 70px;
        width: 70px;
        margin: 0 auto;
        background: $gradient-reversed;
        border-radius: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon-title{
        margin: 0.5rem;
        font-weight: 500;
        font-size: 1.2rem;
    }
    .icon-subtitle{
        margin: 0 auto;
        max-width: 75%;
    }
    @media (min-width: $sm) {
        .icon-subtitle{ max-width: 100%; }
    }

    @media (min-width: $lg) {
        .icons{
            height: 90px;
			 width: 90px;
        }
        .icon-title{ font-size: 1.5rem; }
    }

</style>
