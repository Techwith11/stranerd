<template>
	<li class="d-flex small" :class="{'justify-content-end': isByMe}">
		<div class="chat" :class="isByMe ? 'mine' : 'not-mine'">
			<p class="m-0" v-if="!chat.isMedia">{{ chat.content }}</p>
			<div class="d-flex justify-content-between align-items-center" v-if="chat.isMedia">
				<span class="mr-3 d-block text-truncate">{{ chat.media.name }}</span>
				<a :href="chat.media.link" target="__blank">
					<i class="fas fa-download text-info"></i>
				</a>
			</div>
			<div class="d-flex justify-content-between small mt-1">
				<span class="mr-2" :class="{'d-none':!isByMe, 'text-primary': !chat.isRead, 'text-success': chat.isRead }">
					<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
				</span>
				<span>{{ chat.createdDate }}</span>
			</div>
		</div>
	</li>
</template>

<script lang="ts">
import { defineComponent, computed, onUnmounted, onMounted } from '@vue/composition-api'
import { ChatEntity } from '@modules/sessions/domain/entities/chat'
import { useStore } from '@/usecases/store'
export default defineComponent({
	props: {
		chat: {
			required: true,
			type: ChatEntity
		}
	},
	setup(props){
		const isByMe = computed(() => props.chat.from === useStore().auth.getId.value)
		onMounted(() => {
			if(!isByMe.value && !props.chat.isRead){
				if(document.visibilityState === 'visible'){
					// Make request to make chat read
				}else{
					document.onvisibilitychange = async () => {
						if(document.visibilityState === 'visible'){
							// Make request to make chat read
						}
					}
				}
			}
		})
		onUnmounted(() => document.onvisibilitychange = null)
		return { isByMe }
	}
})
</script>

<style lang="scss" scoped>
.chat{
	min-width: 6rem;
	max-width: 75%;
	padding: 1rem;
	margin: 0.25rem 0;
}
.mine{
	border-radius: 1.5rem 1.5rem 0 1.5rem;
	background: $primary-light;
	color: $text-black;
	position: relative;
	&::after{
		content: '';
		top: 100%;
		right:0;
		position: absolute;
		width: 2.5rem;
		height: 2.5rem;
		border-top-right-radius: 50%;
		box-shadow: 0 -1.25rem 0 0 $primary-light;
	}
}
.not-mine{
	border-radius: 1.5rem 1.5rem 1.5rem 0;
	background: #707070;
	color: $white;
	position: relative;
	&::after{
		content: '';
		top: 100%;
		left: 0;
		position: absolute;
		width: 2.5rem;
		height: 2.5rem;
		border-top-left-radius: 50%;
		box-shadow: -1.25rem 0 0 #707070;
	}
}
</style>
