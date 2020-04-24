<template>
	<div>
		<div class="alert alert-primary" role="alert">
			<p>{{ question.title }}</p>
			<form>
				<div class="form-check">
					<input class="form-check-input" type="radio" value="a" id="a" v-model="answer">
					<label class="form-check-label" for="a">
						A. {{ question.a }}
					</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" value="b" id="b" v-model="answer">
					<label class="form-check-label" for="b">
						B. {{ question.b }}
					</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" value="c" id="c" v-model="answer">
					<label class="form-check-label" for="c">
						C. {{ question.c }}
					</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" value="d" id="d" v-model="answer">
					<label class="form-check-label" for="d">
						D. {{ question.d }}
					</label>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			answer: null
		}),
		props: {
			question: {
				required: true,
				type: Object
			},
			onSelect: {
				required: true,
				type: Function
			},
			index: {
				required: true,
				type: Number
			}
		},
		watch:{
			answer(){
				this.onSelect(this.index, this.answer)
			}
		}
	}
</script>