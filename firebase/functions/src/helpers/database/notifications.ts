import * as admin from 'firebase-admin'

export type Notification = {
    title: string
    description: string
    seen: boolean
    type: string
    action: string
    dates: {
        createdAt: number
    }
}

export const createNotification = async (userId: string, data: { title: string, description: string, type: string, action: string }) => {
    try{
        const notification: Notification = {
            ...data, seen: false,
            dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
        }

        await admin.database().ref(`users/${userId}/notifications`).push(notification)
    }catch(e){ console.log(e.message) }
}

