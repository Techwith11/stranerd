<template>
	<div class="container py-4">
		<chat-card v-for="chat in chats" :key="chat['.key']" :chat="chat" />
	</div>
</template>

<script>
	import ChatCard from '@/components/chats/list/ChatCard'
	export default {
		name: 'Chats',
		data: () => ({
			chats: [
				{ '.key': 1 , from:'1', to: 'fghjj', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,2,3,18,14,11) },
				{ '.key': 2 , from:'1', to: 'dgfhj', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,2,2,19,25,38) },
				{ '.key': 3 , from:'1', to: 'gfhjy', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,2,1,11,21,31) },
				{ '.key': 4 , from:'wyieh', to: '1', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,1,30,22,11,59) },
				{ '.key': 5 , from:'1', to: 'bhiu', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,1,29,18,16,29) },
				{ '.key': 6 , from:'1', to: 'trygh', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,1,29,8,0,11) },
				{ '.key': 7 , from:'1', to: '9oilk', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: true, sentAt: new Date(2020,1,27,2,34,22) },
				{ '.key': 8 , from:'tfygu', to: '1', content: 'Hello, my name is Kevin. I would like you to take me on Probability and Statistics. I have an exam coming up.', read: false, sentAt: new Date(2020,1,13,12,54,41) },
			]
		}),
		components: {
			'chat-card': ChatCard
		},
		mounted(){
			/* TODO: get all the keys from the chats object in the auth user account and fetch all users that their ids fall in the list */
		}
	}
</script>