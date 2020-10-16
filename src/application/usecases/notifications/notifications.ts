import { NotificationEntity } from '@modules/notifications/domain/entities/notification'
import { computed, ref, watch, Ref } from '@vue/composition-api'
import { ListenToNotifications } from '@modules/notifications'
import { useStore } from '@/usecases/store'

const notificationsGlobalState = {
	loading: false,
	started: false,
	notifications: ref([]) as Ref<NotificationEntity[]>,
	error: '',
	listener: () => {},
}

const startListener = async () => {
	if(!useStore().auth.getId.value) return
	try{
		const addNotifications = (entities: NotificationEntity[]) => notificationsGlobalState.notifications.value = entities
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
		notifications: computed(() => notificationsGlobalState.notifications.value),
		unreadNotifications: computed(() => notificationsGlobalState.notifications.value.filter((n) => !n.seen)),
	}
}
