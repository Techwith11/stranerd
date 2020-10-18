<template>
	<div>
		<page-loading v-if="loading" />
		<template v-else>
			<helper-message :message="error" v-if="error"/>
			<helper-message v-if="chats.length === 0" :message="timer > 0 ? 'No messages. Send a message now' : 'Session has ended and no message was sent.'" />
			<ul class="list-group" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}" v-if="chats.length > 0">
				<!--<li class="d-block text-center small text-muted mb-2" v-if="hasMore">
					<loading v-if="isOlderChatsLoading" />
					<span @click="fetchOlderMessages">Fetch Older</span>
				</li>-->
				<ChatCard :chat="chat" :session="session" v-for="chat in chats" :key="chat.id" />
			</ul>
			<ul v-else></ul>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from '@vue/composition-api'
import { useChats } from '@application/usecases/sessions/chats'
import ChatCard from '@/components/sessions/single/ChatCard.vue'
export default defineComponent({
	components: {
		ChatCard
	},
	props: {
		session: {
			required: true,
			type: String
		},
		timer: {
			required: true,
			type: Number
		}
	},
	setup(props) {
		const { loading, chats, closeListener, error } = useChats(props.session)
		onUnmounted(closeListener)
		return { loading, chats, error }
	}
})
</script>
