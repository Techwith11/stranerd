<template>
	<div class="my-4 bg-white p-4 shadow-sm rounded-lg">
		<h4 class="text-muted mb-3">Upgrade User to Admin</h4>
		<div class="d-flex align-items-center">
			<input type="email" class="form-control flex-grow-1" placeholder="Enter user's email address" v-model="email">
			<a @click.prevent="clearAll"><i class="fas fa-trash mx-3 text-danger"></i></a>
		</div>
		<button class="btn btn-primary my-3" @click="getUsersByEmail" :disabled="!email">
			<i class="fas fa-spinner fa-spin mr-2" v-if="fetchingUsers"></i>
			<span>Find User</span>
		</button>
		<div class="mt-2" v-if="fetched && !fetchingUsers">
			<p class="text-danger opacity-75" v-if="users.length === 0">No user with such email exists</p>
			<div class="my-3" v-for="user in users" :key="user['.key']">
				<div class="d-flex justify-content-between align-items-center">
					<div class="text-truncate">
						<p class="lead mb-1 text-wrap">{{ user.bio.name }}</p>
						<p class="small mb-0 text-wrap">{{ user.bio.email }}</p>
					</div>
					<button class="btn-sm text-nowrap btn-danger" v-if="user.roles.isAdmin" @click="deAdminUser(user)" :disabled="upgrading">
						<i class="fas fa-spinner fa-spin" v-if="upgrading"></i>
						<span v-else>Remove admin</span>
					</button>
					<button class="btn-sm text-nowrap btn-success" v-else @click="adminUser(user)" :disabled="upgrading">
						<i class="fas fa-spinner fa-spin" v-if="upgrading"></i>
						<span v-else>Make admin</span>
					</button>
				</div>
				<hr class="mt-2">
			</div>
		</div>
	</div>
</template>

<script>
import { firestore } from '@/config/firebase'
import { makeAdmin, removeAdmin } from '@/config/admin/upgrades'
export default {
	data: () => ({
		email: '',
		fetched: false,
		fetchingUsers: false,
		upgrading: false,
		users: []
	}),
	methods: {
		clearAll(){
			this.email = ''
			this.fetched = false
			this.fetchingUsers = false
			this.users = []
		},
		async getUsersByEmail(){
			this.fetchingUsers = true
			this.fetched = true
			try{
				this.users = []
				let docs = await firestore.collection('users').where('bio.email','==',this.email).get()
				docs.forEach((doc) => this.users.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching users. Try refreshing the page' }) }
			this.fetchingUsers = false
		},
		async adminUser(user){
			this.upgrading = true
			await makeAdmin(user['.key'])
			await this.getUsersByEmail()
			this.upgrading = false
		},
		async deAdminUser(user){
			this.upgrading = true
			await removeAdmin(user['.key'])
			await this.getUsersByEmail()
			this.upgrading = false
		}
	}
}
</script>
