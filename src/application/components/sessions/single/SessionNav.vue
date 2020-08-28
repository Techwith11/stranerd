<template>
	<div class="bg-accent p-3 d-flex flex-lg-column align-items-center justify-content-center text-white">
    <div class="mb-lg-3 text-center d-none d-lg-block">
      <p class="mb-0">Chat Session <br> with</p>
    </div>
    <div class="d-flex flex-column align-items-center mb-lg-4">
      <img class="profile-image" :src="getImageLink" alt="" />
      <router-link :to="`/users/${user['.key']}`" class="text-truncate text-white">{{ user.bio ? user.bio.name : '' }}</router-link>
    </div>
    <h4 class="my-0 text-nowrap" v-if="timer > 0" :class="timer < 300 ? 'text-danger' : 'text-white'">{{ getTime }}</h4>
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
			const hours = Math.floor(this.timer / 3600).toFixed(0)
			const minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
			const seconds = Math.floor(this.timer % 60).toFixed(0)
			return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
		}
	}
}
</script>

<style lang="scss" scoped>
  .bg-accent{ background: $accent; }
  .profile-image{
    width: 50px;
    height: 50px;
    @media (min-width: $lg){
      .profile-image{
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
