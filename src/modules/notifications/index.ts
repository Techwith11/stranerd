import { NotificationFirebaseDataSource } from './data/datasources/notification-firebase'
import { NotificationTransformer } from './data/transformers/notification'
import { NotificationRepository } from './data/repositories/notification'
import { AddNotificationUseCase } from './domain/usecases/addNotification'
import { ListenToNotificationsUseCase } from './domain/usecases/listenToNotifications'
import { FindNotificationUseCase } from './domain/usecases/findNotification'
import { UpdateNotificationUseCase } from './domain/usecases/updateNotification'
import { DeleteNotificationUseCase } from './domain/usecases/deleteNotification'

const notificationDataSource = new NotificationFirebaseDataSource()

const notificationTransformer = new NotificationTransformer()

const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)

export const AddNotification = new AddNotificationUseCase(notificationRepository)
export const FindNotification = new FindNotificationUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const UpdateNotification = new UpdateNotificationUseCase(notificationRepository)
export const DeleteNotification = new DeleteNotificationUseCase(notificationRepository)
