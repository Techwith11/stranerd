<template>
	<div class="card my-3">
		<div class="card-body">
			<h5 class="card-title d-flex justify-content-between">
				<span>{{ session.duration }} hours</span>
				<span>Rated:{{ session.student_rating }}</span>
			</h5>
			<h6 class="card-subtitle mb-2 text-muted">{{ session.student_comment }}</h6>
			<p class="card-text">{{ session.created_at.toDateString() }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			session: {
				required: true,
				type: Object
			}
		}
	}
</script>