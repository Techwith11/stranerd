import * as admin from 'firebase-admin'

type Type = 'info' | 'warning' | 'error' | 'success'

export type Notification = {
    title: string
    description: string
    seen: boolean
    type: Type
    action: string
    dates: {
        createdAt: number
    }
}

export const createNotification = async (userId: string, data: { title: string, description: string, type: Type, action: string }) => {
    try{
        await admin.database().ref(`users/${userId}/notifications`).push({
            ...data, seen: false,
            dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
        })
    }catch(e){ console.log(e.message) }
}

