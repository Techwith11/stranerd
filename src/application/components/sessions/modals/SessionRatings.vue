<template>
	<div class="m-md-5">
		<p class="text-center my-3">Time to leave a rating for the session</p>
		<div class="d-flex justify-content-center my-3">
			<a @click.prevent="setRatingFor1()"><i class="fas fa-3x mx-1" :class="{'fa-star text-warning': rating > 0.5, 'fa-star-half-alt text-warning': rating > 0 && rating < 1, 'fa-star text-secondary': rating < 0.5 }"></i></a>
			<a @click.prevent="setRatingFor2()"><i class="fas fa-3x mx-1" :class="{'fa-star text-warning': rating > 1.5, 'fa-star-half-alt text-warning': rating > 1 && rating < 2, 'fa-star text-secondary': rating < 1.5 }"></i></a>
			<a @click.prevent="setRatingFor3()"><i class="fas fa-3x mx-1" :class="{'fa-star text-warning': rating > 2.5, 'fa-star-half-alt text-warning': rating > 2 && rating < 3, 'fa-star text-secondary': rating < 2.5 }"></i></a>
			<a @click.prevent="setRatingFor4()"><i class="fas fa-3x mx-1" :class="{'fa-star text-warning': rating > 3.5, 'fa-star-half-alt text-warning': rating > 3 && rating < 4, 'fa-star text-secondary': rating < 3.5 }"></i></a>
			<a @click.prevent="setRatingFor5()"><i class="fas fa-3x mx-1" :class="{'fa-star text-warning': rating > 4.5, 'fa-star-half-alt text-warning': rating > 4 && rating < 5, 'fa-star text-secondary': rating < 4.5 }"></i></a>
		</div>
		<div class="form-group my-3">
			<textarea rows="5" class="form-control" placeholder="Please leave a comment ..." v-model="comment"></textarea>
		</div>
		<div class="d-flex justify-content-end my-3">
			<button class="btn-success" :disabled="isLoading" @click="submitRating">
				<loading class="mr-2" v-if="isLoading" />
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
			try{
				await this.submitSessionRating({ rating: this.rating, comment: this.comment })
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			this.isLoading = false
		}
	}
}
</script>
