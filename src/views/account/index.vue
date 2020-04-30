<template>
	<div class="container" v-if="Object.keys(getUser).length > 0">
		<div>
			<h4>Bio</h4>
			<p>Name: {{ getUser.bio.name }}</p>
			<p>Email: {{ getUser.bio.email }}</p>
			<p>Bio: {{ getUser.bio.bio }}</p>
			<hr>
		</div>
		<div>
			<h4>Status</h4>
			<p>Online: {{ getUser.status.online }}</p>
			<p>Last seen: {{ new Date(getUser.status.lastSeen.seconds * 1000) }}</p>
			<hr>
		</div>
		<div>
			<h4>Dates</h4>
			<p>Registered on: {{ new Date(getUser.dates.registeredAt.seconds * 1000) }}</p>
			<hr>
		</div>
		<div>
			<h4>Account Type</h4>
			<p>Premium: {{ getUser.account.premium }}</p>
			<hr>
		</div>
		<div>
			<h4>Roles</h4>
			<span class="mr-3" v-if="getUser.roles.isStudent">Student: {{ getUser.roles.isStudent }}</span>
			<span class="mr-3" v-if="getUser.roles.isTutor">Tutor: {{ getUser.roles.isTutor }}</span>
			<span class="mr-3" v-if="getUser.roles.isAdmin">Admin: {{ getUser.roles.isAdmin }}</span>
			<hr>
		</div>
		<div v-if="getUser.roles.isTutor">
			<h4>Tutor details</h4>
			<p>Level {{ getUser.tutor.level }} {{ getUser.tutor.course }}</p>
			<p>Qualification: {{ getUser.tutor.qualification }}</p>
			<p>Ratings: {{ getUser.tutor.ratings }}</p>
			<p>{{ getUser.tutor.upgrade }}</p>
			<hr>
		</div>
		<div>
			<h4>Chatted With</h4>
			<p>{{ getUser.chattedWith.join(', ') }}</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'MyAccount',
		computed: {
			...mapGetters(['getUser'])
		}
	}
</script>