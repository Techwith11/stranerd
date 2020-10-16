import { NotificationEntity } from '@modules/notifications/domain/entities/notification'
import { computed, reactive, watch } from '@vue/composition-api'
import { ListenToNotifications } from '@modules/notifications'
import { useStore } from '@/usecases/store'

const notificationsGlobalState = reactive({
	loading: false,
	started: false,
	notifications: [] as NotificationEntity[],
	error: '',
	listener: () => {},
})

const startListener = async () => {
	if(!useStore().auth.getId.value) return
	try{
		const addNotifications = (entities: NotificationEntity[]) => notificationsGlobalState.notifications = entities
		notificationsGlobalState.listener()
		notificationsGlobalState.listener = await ListenToNotifications.call(useStore().auth.getId.value, addNotifications)
		notificationsGlobalState.started = true
	}catch(e){ notificationsGlobalState.error = 'Error fetching notifications' }
}

const startListenerOnInit = async () => {
	notificationsGlobalState.loading = true
	await startListener()
	notificationsGlobalState.loading = false
}

const closeListener = () => notificationsGlobalState.listener()

export const useNotifications = () => {
	if(!notificationsGlobalState.started && !notificationsGlobalState.loading) startListenerOnInit()

	watch(() => useStore().auth.getId.value, async () => {
		if(useStore().auth.getId.value) await startListenerOnInit()
		else closeListener()
	})

	return {
		loading: computed(() => notificationsGlobalState.loading),
		error: computed(() => notificationsGlobalState.error),
		notifications: computed(() => notificationsGlobalState.notifications),
		unreadNotifications: computed(() => notificationsGlobalState.notifications.filter((n) => !n.seen)),
	}
}
