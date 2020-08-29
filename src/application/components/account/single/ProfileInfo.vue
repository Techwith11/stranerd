<template>
  <div class="row">
    <div class="col-md-6 d-flex align-items-center justify-content-center flex-wrap">
      <div class="mb-3 mb-md-0">
        <img :src="getUserImageLink" alt="" class="profile-image">
      </div>
      <div class="mb-3">
        <h4 class="my-2 text-truncate">{{ getUser.bio.name }}</h4>
        <h6 class="mb-1 text-truncate">{{ getUser.bio.email }}</h6>
        <a class="text-info d-block" @click.prevent="setAccountModalEditProfile">Edit profile info</a>
        <a class="text-info" @click.prevent="setAccountModalUpdatePassword">Update Password</a>
      </div>
    </div>
    <div class="col-md-6">
      <div class="rounded shadow-sm p-3 mx-auto" style="max-width: 60ch;">
        <h5 class="mb-2">About Me:</h5>
        <p>{{ getUser.bio.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useStore } from '@/usecases/store'
export default defineComponent({
	setup(){
		const getUser = useStore().auth.getUser
		return {
			getUser,
			getUserImageLink: computed(() => getUser.value.bio?.image?.link ?? useStore().auth.getDefaultImage),
			setAccountModalEditProfile: useStore().modals.setAccountModalEditProfile,
			setAccountModalUpdatePassword: useStore().modals.setAccountModalUpdatePassword,
		}
	}
})
</script>

<style lang="scss" scoped>
	img.profile-image{ width: 120px; height: 120px; border: 3px solid $primary-dark; }
</style>
