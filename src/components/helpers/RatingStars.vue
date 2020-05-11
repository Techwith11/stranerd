<template>
	<div :class="{'my-1': rating > 0}">
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 0.5, 'fa-star-half-alt text-warning': rating > 0 && rating < 1, 'd-none': rating < 0.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 1.5, 'fa-star-half-alt text-warning': rating > 1 && rating < 2, 'd-none': rating < 1.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 2.5, 'fa-star-half-alt text-warning': rating > 2 && rating < 3, 'd-none': rating < 2.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 3.5, 'fa-star-half-alt text-warning': rating > 3 && rating < 4, 'd-none': rating < 3.5 }"></i>
		<i class="fas mx-1" :class="{'fa-star text-warning': rating > 4.5, 'fa-star-half-alt text-warning': rating > 4 && rating < 5, 'd-none': rating < 4.5 }"></i>
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