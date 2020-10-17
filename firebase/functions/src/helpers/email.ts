import * as admin from 'firebase-admin'
import * as googleapis from 'googleapis'
import { createTransport } from 'nodemailer'
import * as Template from 'email-templates'
import { environmentVariables } from './environment'

const { email: { email, clientId, clientSecret, refreshToken }, meta: { domain } } = environmentVariables.admin
const meta = { domain, logo: `${domain}/img/stranerd_logo.png` }

export const sendMail = async (to: string, subject: string ,content: string) => {
	const oauth2Client = new googleapis.google.auth.OAuth2(clientId, clientSecret, 'https://developers.google.com/oauthplayground')
	oauth2Client.setCredentials({ refresh_token: refreshToken })
	const accessToken = (await oauth2Client.getAccessToken()).token!

	const transporter = createTransport({
		service: 'gmail',
		auth: { type: 'OAuth2', user: email, clientId, clientSecret, refreshToken, accessToken, },
		tls: { rejectUnauthorized: false, }
	})
	await transporter.sendMail({
		from: `Stranerd`,
		to, subject,
		html: content
	})
}

export const sendMailAndCatchErrors = async (to: string, subject: string ,content: string) => {
	try{
		await sendMail(to, subject, content)
		return true
	}catch(e){
		await admin.firestore().collection('errors/types/emails').add({
			error: e.message,
			subject, to, content,
			dates: { triedAt: admin.firestore.FieldValue.serverTimestamp() }
		})
		return false
	}
}

export const sendPurchaseEmail = async (to: string, user: any, cart: any[]) => {
	const content = await new Template({ message:{} }).render('purchaseEmail/index.pug',
		{ user, cart, meta })
	return await sendMailAndCatchErrors(to, `Recent Purchase at ${domain}`, content)
}

export const sendSessionRequestEmail = async (to: string, student: any, time: string) => {
	const content = await new Template({ message:{} }).render('sendSessionRequestEmail/index.pug',
		{ student, meta, time })
	return await sendMailAndCatchErrors(to, 'Session Request', content)
}

import { Notification } from '../database/onCreate/notifications'
export const sendNewNotificationEmail = async (to: string, notification: Notification) => {
	const content = await new Template({ message:{} }).render('newNotification/index.pug',
		{ notification, meta })
	return await sendMailAndCatchErrors(to, notification.title, content)
}
