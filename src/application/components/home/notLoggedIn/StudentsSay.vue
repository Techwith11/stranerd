<template>
	<div id="background">
		<div class="container">
			<h2 class="text-center text-gold-dark mb-md-3">What Students Say</h2>
			<p class="small mx-auto">Let us see what some of our favourite students have to say about us</p>
			<div class="row mt-3 justify-content-center">
				<div class="col-md-6 col-lg-4 mt-2" v-for="(testimonial,index) in testimonials" :key="index">
					<div class="card rounded-xl shadow-sm">
						<div class="card-body">
							<p class="mb-2 text-gold">
								<i class="fas fa-2x fa-quote-left"></i>
							</p>
							<p class="card-text">{{ testimonial.testimonial }}</p>
							<div class="bg-gold mx-auto my-2" style="height: 4px; width: 50%"></div>
							<div class="d-flex justify-content-center align-items-center">
								<span class="font-weight-bold">{{ testimonial.name }}</span><br/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	setup(){
		return {
			testimonials: [
				{
					name: 'Elah Ajene',
					testimonial: 'Stranerd not only exhibited standard and professional attributes, but quick and guaranteed responses, quality tutors, and assured understanding of the desired course.\n' +
                            'Stranerd aided me in science courses ranging from Calculus, Physics to Chemistry, across various academic levels. With step by step in-detail explanations, to diagrammatic problem solving techniques, Stranerd puts the understanding of students as their topmost priority. For extra academic aid, and success in future courses, Stranerd should be your primary option.'
				},
				{
					name: 'Ajani Hafsat',
					testimonial: ' I took a physics course last semester that was giving me a seriously hard time, I told a friend and they recommended that I message stranerd. They helped me solve problems that I could not and they helped me with assignments. They tutored me for my exams as well. I had a whopping 96% percent In my finals and I could not be happier.\n' +
                    'I recommend Stranerd to students that are having issues finding solutions for difficult problems. They take their time to explain and ensure that you know what you are supposed to know'
				},
				{
					name: 'Barakat Yusuf',
					testimonial: 'They have great customer service, they’re very fast and efficient and also they ensure you get good grades! Totally recommend. If there was a rating higher than a 5 star I’d totally give them! ⭐️'
				}
			]
		}
	}
})
</script>

<style lang="scss" scoped>
    #background{
        background: url('../../../assets/images/students_say_background.svg');
        background-size: cover;
        padding: 4rem 0;
        color: $text-black;
        text-align: center;
    }

</style>
