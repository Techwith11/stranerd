<template>
	<div class="m-md-5 text-center">
		<p class="my-3 lead text-danger">Student cancelled session</p>
		<button class="bg-info text-white shadow-none ml-auto my-2 rounded" @click="cancelSessionAndCloseModal">
			Close Modal
		</button>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions(['cancelSessionAndCloseModal'])
        }
    }
</script>