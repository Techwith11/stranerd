<template>
	<div class="my-2">
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 0.5, 'fa-star-half-alt text-warning': rating > 0 && rating < 1, 'fa-star text-secondary': rating < 0.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 1.5, 'fa-star-half-alt text-warning': rating > 1 && rating < 2, 'fa-star text-secondary': rating < 1.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 2.5, 'fa-star-half-alt text-warning': rating > 2 && rating < 3, 'fa-star text-secondary': rating < 2.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 3.5, 'fa-star-half-alt text-warning': rating > 3 && rating < 4, 'fa-star text-secondary': rating < 3.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 4.5, 'fa-star-half-alt text-warning': rating > 4 && rating < 5, 'fa-star text-secondary': rating < 4.5 }"></i>
	</div>
</template>

<script>
	export default {
		props: {
			rating: {
				type: Number,
				required: true
			}
		}
	}
</script>