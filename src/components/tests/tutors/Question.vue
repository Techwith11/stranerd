<template>
	<div class="alert border" role="alert" :class="{ 'border-info': !disabled,
													'border-danger': disabled && question.answer !== answer,
													'border-success': disabled && question.answer === answer}"
	>
		<p class="lead">{{ index + 1 }}. {{ question.title }}</p>
		<div class="form-check py-1 pl-3 my-1 rounded" v-for="letter in letters" :key="letter" @click="disabled ? null : answer = letter"
			:class="{ 'bg-info text-white': !disabled && answer === letter,
						'bg-danger text-white': disabled && question.answer !== letter && answer === letter,
						'bg-success text-white': disabled && question.answer === letter }"
		>
			<span>
				{{ letter.toUpperCase() }}. {{ question[letter] }}
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			answer: null,
			letters: ['a','b','c','d']
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
			},
			disabled: {
				required: true,
				type: Boolean
			}
		},
		watch:{
			answer(){
				if(!this.disabled){
					this.onSelect(this.question['.key'], this.answer)
				}
			}
		}
	}
</script>