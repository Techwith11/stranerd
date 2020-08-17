<template>
	<div class="alert" role="alert" :class="test.score < 70 ? 'alert-danger' : 'alert-success'">
		<div class="d-flex justify-content-between">
			<span>{{ test.course }} Level {{ test.level }}</span>
			<h5>{{ test.score }}%</h5>
		</div>
		<span>Taken {{ getDateOrTime }}</span>
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