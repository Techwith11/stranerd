import { firestore } from'firebase-admin'
import { createTransport } from 'nodemailer'
import * as Template from 'email-templates'
import { environmentVariables } from './environment'

const { email: { email, pass }, meta: { domain } } = environmentVariables.admin
const meta = { domain, logo: `${domain}/img/stranerd_logo.png` }

export const sendMail = async (to: string, subject: string ,content: string) => {
	const transporter = createTransport({ service: 'gmail', auth: { user: email, pass } })
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
		await firestore().collection('errors/types/emails').add({
			error: e.message,
			subject, to, content,
			dates: { triedAt: firestore.FieldValue.serverTimestamp() }
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
