<template>
	<footer class="bg-dark py-5 text-white mt-auto">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-6">
					<p class="lead">Stranerd</p>
					<p class="small">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
					<p>
						<a href="https://facebook.com/officialstranerd" target="_blank"><i class="fab fa-facebook-f"></i></a>
						<a href="https://instagram.com/officialstranerd" target="_blank"><i class="fab fa-instagram"></i></a>
						<a href="https://twitter.com/stranerds" target="_blank"><i class="fab fa-twitter"></i></a>
					</p>
					<form @submit.prevent="subscribeToMailingList" class="mb-5">
						<h6>Subscribe to our Newsletter</h6>
						<div class="form-group">
							<input type="email" class="form-control" v-model="factory.email" placeholder="Email Address"
								:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email') }">
							<span class="small text-danger" v-if="factory.errors.email">{{ factory.errors.email }}</span>
						</div>
						<button class="btn btn-primary mx-0" type="submit" :disabled="loading">
							<loading class="mr-1" v-if="loading" />
							<span>Subscribe</span>
						</button>
					</form>
				</div>
				<div class="col-4 col-md-2">
					<h6>Quick Links</h6>
					<router-link class="links" to="/">Home</router-link>
					<router-link class="links" to="/blog">Blog</router-link>
				</div>
				<div class="col-4 col-md-2">
					<h6>Contact Us</h6>
					<p class="links">Mailing Address: 651 N, Broad Street, Suite 206, Middletown Delaware 19709</p>
					<p class="links">Call us: <a href="tel:+14040435611">+14040435611</a></p>
					<p class="links">Mail us: <a href="mailto:support@stranerd.com">support@stranerd.com</a></p>
				</div>
				<div class="col-4 col-md-2">
					<h6>Others</h6>
					<router-link class="links" to="/legal/privacy-policy">Privacy Policy</router-link>
					<router-link class="links" to="/legal/terms-of-use">Terms of Use</router-link>
					<router-link class="links" to="/legal/terms-and-conditions/users">Terms and Conditions</router-link>
					<router-link class="links" to="/legal/terms-and-conditions/tutors">Terms and Conditions for Tutors</router-link>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
    i{
        border-radius: 50rem;
        width: 2rem;
        height: 2rem;
        border: 1px solid transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
        color: white;
        &.fa-facebook-f{
            background: #3B5998;
        }
        &.fa-twitter{
            background: #00ACED;
        }
        &.fa-instagram{
            background: #F56040;
        }
    }
    .section{
        padding: 0 1rem;
    }
    h6{
        margin-bottom: 1rem;
    }
    .links{
        display: block;
        color: $white;
        font-size: 0.75rem;
        border: none !important;
    }
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useMailingList } from '@application/usecases/users/role'
export default defineComponent({
	setup(){
		const { loading, factory, subscribeToMailingList } = useMailingList()
		return { loading, factory, subscribeToMailingList }
	}
})
</script>
