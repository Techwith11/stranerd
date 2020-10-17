import { Auth } from '@application/usecases/store/modules/auth'
import { Modals } from '@application/usecases/store/modules/modals'
import { Sessions } from '@application/usecases/store/modules/sessions'

export const useStore = () => {
	return {
		auth: Auth,
		modals: Modals,
		sessions: Sessions
	}
}
