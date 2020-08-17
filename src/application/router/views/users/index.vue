<template>
	<Default>
		<div class="container">
			<p>Users List</p>
		</div>
	</Default>
</template>

<script>
export default {
	name: 'Users',
	meta(){
		return {
			title: 'Users',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: ''
				},
				{
					vmid: 'keywords',
					name: 'keywords',
					content: [].join(', ')
				}
			]
		}
	}
}
</script>
