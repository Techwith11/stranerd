<template>
	<div class="m-md-5">
		<p class="text-center my-3">Time to leave a rating for the session</p>
		<div class="d-flex justify-content-center my-3">
			<i class="fas fa-3x mx-1" @click="setRatingFor1()" :class="{'fa-star text-warning': rating > 0.5, 'fa-star-half-alt text-warning': rating > 0 && rating < 1, 'fa-star text-secondary': rating < 0.5 }"></i>
			<i class="fas fa-3x mx-1" @click="setRatingFor2()" :class="{'fa-star text-warning': rating > 1.5, 'fa-star-half-alt text-warning': rating > 1 && rating < 2, 'fa-star text-secondary': rating < 1.5 }"></i>
			<i class="fas fa-3x mx-1" @click="setRatingFor3()" :class="{'fa-star text-warning': rating > 2.5, 'fa-star-half-alt text-warning': rating > 2 && rating < 3, 'fa-star text-secondary': rating < 2.5 }"></i>
			<i class="fas fa-3x mx-1" @click="setRatingFor4()" :class="{'fa-star text-warning': rating > 3.5, 'fa-star-half-alt text-warning': rating > 3 && rating < 4, 'fa-star text-secondary': rating < 3.5 }"></i>
			<i class="fas fa-3x mx-1" @click="setRatingFor5()" :class="{'fa-star text-warning': rating > 4.5, 'fa-star-half-alt text-warning': rating > 4 && rating < 5, 'fa-star text-secondary': rating < 4.5 }"></i>
		</div>
		<div class="form-group my-3">
			<textarea rows="5" class="form-control" placeholder="Please leave a comment ..." v-model.trim="comment"></textarea>
		</div>
		<div class="d-flex justify-content-end my-3">
			<button class="accent-button" :disabled="isLoading" @click="submitRating">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading"></i>
				<span>Continue</span>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data: () => ({
			rating: 0,
			comment: '',
			isLoading: false
		}),
		methods: {
			...mapActions([ 'submitSessionRating']),
			setRatingFor1(){ this.rating === 0.5 ? this.rating = 1 : this.rating = 0.5  },
			setRatingFor2(){ this.rating === 1.5 ? this.rating = 2 : this.rating = 1.5  },
			setRatingFor3(){ this.rating === 2.5 ? this.rating = 3 : this.rating = 2.5  },
			setRatingFor4(){ this.rating === 3.5 ? this.rating = 4 : this.rating = 3.5  },
			setRatingFor5(){ this.rating === 4.5 ? this.rating = 5 : this.rating = 4.5  },
			async submitRating(){
				this.isLoading = true
				await this.submitSessionRating({ rating: this.rating, comment: this.comment })
				this.isLoading = false
			}
		}
	}
</script>