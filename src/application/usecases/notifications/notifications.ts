import { NotificationEntity } from '@modules/notifications/domain/entities/notification'
import { computed, reactive, watch } from '@vue/composition-api'
import { DeleteNotification, FindNotification, ListenToNotifications } from '@modules/notifications'
import { useStore } from '@/usecases/store'
import { Alert, Notify } from '@/config/notifications'

const globalState = reactive({
	loading: false,
	started: false,
	notifications: [] as NotificationEntity[],
	error: '',
	listener: () => {},
})

const startListener = async () => {
	if(!useStore().auth.getId.value) return
	try{
		const addNotifications = (entities: NotificationEntity[]) => globalState.notifications = entities
		globalState.listener()
		globalState.listener = await ListenToNotifications.call(useStore().auth.getId.value, addNotifications)
		globalState.started = true
	}catch(e){ globalState.error = 'Error fetching notifications' }
}

const startListenerOnInit = async () => {
	globalState.loading = true
	await startListener()
	globalState.loading = false
}

const closeListener = () => globalState.listener()

export const useNotifications = () => {
	if(!globalState.started && !globalState.loading) startListenerOnInit()

	watch(() => useStore().auth.getId.value, async () => {
		if(useStore().auth.getId.value) await startListenerOnInit()
		else closeListener()
	})

	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		notifications: computed(() => globalState.notifications),
		unreadNotifications: computed(() => globalState.notifications.filter((n) => !n.seen)),
	}
}

const fetchNotifications = async (id: string) => {
	let notification = globalState.notifications.find((n) => n.id === id)
	if(notification) return notification
	notification = await FindNotification.call(useStore().auth.getId.value, id)
	if(notification) globalState.notifications.unshift(notification)
	return notification
}

export const useSingleNotification = (id: string) => {
	const state = reactive({
		loading: false,
		error: '',
		notification: undefined as NotificationEntity | undefined,
	})

	const findNotification = async () => {
		state.loading = true
		state.notification = await fetchNotifications(id)
		state.loading = false
	}

	findNotification().catch(() => state.error = 'Error fetching notification')

	const markSeen = () => {
		if(state.notification?.seen) return

	}

	const deleteNotification = async () => {
		try {
			const result = await Alert({
				title: 'Delete notification',
				text: 'Are you sure you want to delete this notification? This cannot be undone',
				icon: 'info',
				confirmButtonText: 'Delete'
			})
			if(result.value) {
				state.loading = true
				await DeleteNotification.call(useStore().auth.getId.value, id)
				globalState.notifications = globalState.notifications.filter((n) => n.id !== id)
				state.loading = false
				await Notify({ icon: 'success', title: 'Notification deleted successfully' })
			}
			return result.value
		} catch(error) {
			await Notify({ icon: 'error', title: error.message })
			state.error = error.message
			state.loading = false
			return false
		}
	}

	return {
		loading: computed(() => state.loading),
		error: computed(() => state.error),
		notification: computed(() => state.notification),
		markSeen, deleteNotification
	}

}
