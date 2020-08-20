import { Auth } from '@/usecases/store/modules/auth'
import { Modals } from '@/usecases/store/modules/modals'
import { Sessions } from '@/usecases/store/modules/sessions'

export const useStore = () => {
	return {
		auth: Auth,
		modals: Modals,
		sessions: Sessions
	}
}
