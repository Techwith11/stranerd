<template>
	<div class="m-md-5">
		<p>You have just been sent an email at {{ getUser.bio.email }} containing download links for the items you just purchased.</p>
		<div class="d-flex justify-content-end">
			<button class="btn btn-info" @click="closeCartModal">Close modal</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	setup(){
		return {
			closeCartModal: useStore().modals.closeCartModal,
			getUser: useStore().auth.getUser
		}
	}
})
</script>
