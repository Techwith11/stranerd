import { Auth } from '@/usecases/store/modules/auth'
import { Modals } from '@/usecases/store/modules/modals'
import { Sessions } from '@/usecases/store/modules/sessions'
import { Shop } from '@/usecases/store/modules/shop'

export const useStore = () => {
	return {
		auth: Auth,
		modals: Modals,
		sessions: Sessions,
		shop: Shop
	}
}
