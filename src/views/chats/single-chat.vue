<template>
	<div>
		<single-chat-nav />
		<!-- TODO: Remember to scroll to bottom of chats list -->
		<div class="container py-3">
			<single-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
			<single-chat-form />
		</div>
	</div>
</template>

<script>
	import SingleChatNav from '@/components/chats/single/SingleChatNav'
	import SingleChatMessage from '@/components/chats/single/SingleChatMessage'
	import SingleChatForm from '@/components/chats/single/SingleChatForm'
	export default {
		name: 'Chat',
		data: () => ({
			chats: [
				{ '.key': 1 , from:'1', to: 'dgfhj', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,2,3,18,14,11) },
				{ '.key': 2 , from:'dgfhj', to: '1', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,2,2,19,25,38) },
				{ '.key': 3 , from:'1', to: 'dgfhj', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,2,1,11,21,31) },
				{ '.key': 4 , from:'dgfhj', to: '1', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,1,30,22,11,59) },
				{ '.key': 5 , from:'1', to: 'dgfhj', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,1,29,18,16,29) },
				{ '.key': 6 , from:'dgfhj', to: '1', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,1,29,8,0,11) },
				{ '.key': 7 , from:'1', to: 'dgfhj', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,1,27,2,34,22) },
				{ '.key': 8 , from:'dgfhj', to: '1', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,1,13,12,54,41) },
				{ '.key': 9 , from:'1', to: 'dgfhj', content: '', read: false, sentAt: new Date(2020,1,11,9,58,43), isMedia: true, media: { name: 'Extreme Kinetics.pdf', link: '#' } },
			]
		}),
		components: {
			'single-chat-nav': SingleChatNav,
			'single-chat-message': SingleChatMessage,
			'single-chat-form': SingleChatForm,

		}
	}
</script>