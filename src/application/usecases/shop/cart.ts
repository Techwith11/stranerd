import { computed, reactive } from '@vue/composition-api'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'
import { useStore } from '@/usecases/store'

const globalState = reactive({
	cart: reactive([]) as NoteEntity[]
})

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
