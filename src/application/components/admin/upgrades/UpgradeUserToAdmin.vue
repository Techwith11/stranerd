<template>
	<div class="my-4 bg-white p-4 shadow-sm rounded-lg">
		<h4 class="text-muted mb-3">Upgrade User to Admin</h4>
		<div class="d-flex align-items-center">
			<input type="email" class="form-control flex-grow-1" placeholder="Enter user's email address" v-model="email">
			<a @click.prevent="reset"><i class="fas fa-trash mx-3 text-danger"></i></a>
		</div>
		<button class="btn mx-0 px-3 btn-primary my-3" @click="getUsersByEmail" :disabled="!email">
			<loading class="mr-2" v-if="loading" />
			<span>Find User</span>
		</button>
		<div class="mt-2" v-if="fetched && !loading">
			<p class="text-danger opacity-75" v-if="users.length === 0">No user with such email exists</p>
			<div class="my-3" v-for="user in users" :key="user.id">
				<div class="d-flex flex-wrap justify-content-between align-items-center">
					<div class="text-truncate">
						<p class="lead mb-1 text-wrap">{{ user.name }}</p>
						<p class="small mb-0 text-wrap">{{ user.email }}</p>
					</div>
					<button class="btn-sm mx-0 text-nowrap btn-danger" v-if="user.roles.isAdmin" @click="deAdminUser(user)" :disabled="upgrading">
						<loading class="mr-1" v-if="upgrading" />
						<span>Remove admin</span>
					</button>
					<button class="btn-sm mx-0 text-nowrap btn-success" v-else @click="adminUser(user)" :disabled="upgrading">
						<loading class="mr-1" v-if="upgrading" />
						<span>Make admin</span>
					</button>
				</div>
				<hr class="mt-2">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAdminRoles } from '@application/usecases/users/role'
export default defineComponent({
	setup(){
		const { loading, fetched, upgrading, email, users, getUsersByEmail, adminUser, deAdminUser, reset } = useAdminRoles()
		return { loading, fetched, upgrading, email, users, getUsersByEmail, adminUser, deAdminUser, reset }
	}
})
</script>
