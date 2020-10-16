import { NotificationEntity } from '@modules/notifications/domain/entities/notification'
import { computed } from '@vue/composition-api'
import { ListenToNotifications } from '@modules/notifications'
import { useStore } from '@/usecases/store'

const notificationsGlobalState = {
	loading: false,
	started: false,
	notifications: [] as NotificationEntity[],
	error: '',
	listener: () => {},
}

const startListener = async (userId: string) => {
	try{
		const addNotifications = (entities: NotificationEntity[]) => notificationsGlobalState.notifications = entities
		notificationsGlobalState.listener = await ListenToNotifications.call(userId, addNotifications)
		notificationsGlobalState.started = true
	}catch(e){ notificationsGlobalState.error = 'Error fetching notifications' }
}

const startListenerOnInit = async () => {
	notificationsGlobalState.loading = true
	await startListener(useStore().auth.getId.value)
	notificationsGlobalState.loading = false
}

const closeListener = () => notificationsGlobalState.listener()

export const useNotifications = () => {
	if(!notificationsGlobalState.started) startListenerOnInit()

	return {
		loading: computed(() => notificationsGlobalState.loading),
		error: computed(() => notificationsGlobalState.error),
		notifications: computed(() => notificationsGlobalState.notifications),
	}
}

export const startNotificationsListener = startListener
export const closeNotificationsListener = closeListener
