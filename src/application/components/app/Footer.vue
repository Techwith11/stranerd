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
                    <div class="form-group">
                        <h6>Subscribe to our Newsletter</h6>
                        <input type="email" class="form-control" v-model.trim="$v.email.$model" :class="{'is-invalid': $v.email.$error, 'is-valid': !$v.email.$invalid}">
                        <button class="btn btn-primary mx-0 mt-3 mb-5" :disabled="loading || $v.$invalid" @click.prevent="subscribe">
                            <i class="fas fa-spin fa-spinner mr-2" v-if="loading"></i>
                            <span>Subscribe</span>
                        </button>
                    </div>
                </div>
                <div class="col-4 col-md-2">
                    <h6>Quick Links</h6>
                    <router-link class="links" to="/">Home</router-link>
                    <router-link class="links" to="/blog">Blog</router-link>
                </div>
                <div class="col-4 col-md-2">
                    <h6>Contact Us</h6>
                    <a class="links" href="tel:+14040435611">Call us</a>
                    <a class="links" href="mailto:officialstranerd@gmail.com">Mail us</a>
                </div>
                <div class="col-4 col-md-2">
                    <h6>Others</h6>
                    <router-link class="links" to="/privacy_policy">Privacy Policy</router-link>
                    <router-link class="links" to="terms_and_conditions/">Terms And Conditions</router-link>
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

<script>
import { required, email} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
	data: () => ({
		email: '',
		loading: false
	}),
	validations: {
		email: { required, email }
	},
	methods: {
		...mapActions(['subscribeToMail']),
		async subscribe(){
			this.loading = true
			let email = this.email
			try{
				await this.subscribeToMail(email)
				new window.Toast({ icon: 'success', title: 'Successfully subscribed' })
				this.email = ''
				this.$v.$reset()
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			this.loading = false
		}
	}
}
</script>
