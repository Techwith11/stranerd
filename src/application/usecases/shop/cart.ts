import { computed, reactive } from '@vue/composition-api'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'
import { useStore } from '@/usecases/store'
import { BuyMoreQuestions, SendCartToEmail } from '@root/modules/shop'
import { Notify } from '@/config/notifications'

const globalState = reactive({
	cart: reactive([]) as NoteEntity[]
})

export const clearCart = () => globalState.cart = reactive([])

export const useCart = () => {
	const isInCart = (note: NoteEntity) => globalState.cart.some((n) => n.id === note.id)
	const addToCart = (note: NoteEntity) => {
		if(globalState.cart.findIndex((n) => n.id === note.id) === -1) globalState.cart.push(note)
	}
	const removeFromCart = async (note: NoteEntity) => {
		globalState.cart = globalState.cart.filter((n) => n.id !== note.id)
		if(globalState.cart.length === 0) await useStore().modals.closeCartModal()
	}
	const checkoutNow = async (note: NoteEntity) => {
		addToCart(note)
		await useStore().modals.setCartModalPay()
	}

	return {
		cart: computed(() => globalState.cart),
		cartPrice: computed(() => globalState.cart.reduce((total, curr) => total + curr.price, 0)),
		cartLength: computed(() => globalState.cart.length),
		isInCart, addToCart, removeFromCart, checkoutNow
	}
}

export const useCheckout = () => {
	const state = reactive({ loading: false })
	const checkout = async () => {
		state.loading = true
		try{
			await SendCartToEmail.call(useStore().auth.getId.value, globalState.cart)
			globalState.cart = []
			await useStore().modals.setCartModalEmailConfirmation()
		}catch(e){ await Notify({ title: 'Error sending cart details to email', icon: 'error' }) }
		state.loading = false
	}

	return {
		loading: computed(() => state.loading),
		checkout
	}
}

export const useMoreQuestions = () => {
	const state = reactive({
		price: 10.00,
		quantity: 3,
		loading: false
	})

	const addQuestions = async () => {
		state.loading = true
		try{
			await BuyMoreQuestions.call(useStore().auth.getId.value, state.quantity)
			await Notify({ icon: 'success', title: 'Questions added to profile.' })
			await useStore().modals.closePostModal()
		}catch(e) { await Notify({ icon: 'error', title: 'Error buying more questions' }) }
		state.loading = false
	}

	return {
		price: computed(() => state.price),
		quantity: computed(() => state.quantity),
		loading: computed(() => state.loading),
		addQuestions
	}
}
