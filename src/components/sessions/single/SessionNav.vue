<template>
	<div class="bg-dark">
		<div class="container text-white py-3">
			<div class="d-flex align-items-center">
				<img :src="getImageLink" class="mr-3" width="50px" alt="" />
				<span class="d-block text-truncate text-white mr-2">{{ user.bio ? user.bio.name : '' }}</span>
				<!--<i class="fas fa-circle text-success mr-3"></i>-->
				<h4 class="my-0 ml-auto text-nowrap" v-if="timer > 0" :class="timer < 600 ? 'text-danger' : 'text-white'">{{ getTime }}</h4>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			timer: {
				required: true,
				type: Number
			},
			user: {
				required: true,
				type: Object
			}
		},
        computed: {
			...mapGetters(['getDefaultImage']),
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
            getTime(){
                let hours = Math.floor(this.timer / 3600).toFixed(0)
                let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
                let seconds = Math.floor(this.timer % 60).toFixed(0)
                return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
            }
        }
	}
</script>