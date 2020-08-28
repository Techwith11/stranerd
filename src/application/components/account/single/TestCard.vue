<template>
	<div class="alert" role="alert">
		<div class="d-flex justify-content-between align-items-center mb-1">
			<span class="text-wrap">{{ test.course }} Lv.{{ test.level }}</span>
			<h5 class="mb-0" :class="test.score < 70 ? 'text-danger' : 'text-success'">{{ test.score }}%</h5>
		</div>
		<span class="text-secondary small">taken {{ getDateOrTime }}</span>
	</div>
</template>

<script>
export default {
	props: {
		test: {
			required: true,
			type: Object
		}
	},
	computed: {
		getDateOrTime(){
			const date = new Date(this.test.dates.startedAt.seconds * 1000)
			const now = new Date()
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			const yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
			if(date > today){
				return date.toTimeString().slice(0,5)
			}else if(date > yesterday){
				return 'Yesterday'
			}else{
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
			}
		}
	}
}
</script>
