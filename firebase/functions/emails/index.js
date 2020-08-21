const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const Template = require('email-templates')

const environment = functions.config().environment.mode
const data = functions.config().admin[environment]
const { email, pass } = data.email
const { domain, color } = data.meta
const meta = {
	logo: `${domain}/img/stranerd_logo.png`,
	color, domain
}


export const sendMail = async (to, subject ,content) => {
	const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: email, pass } })
	await transporter.sendMail({
		from: `Stranerd`,
		to, subject,
		html: content
	})
}

const sendMailAndCatchErrors = async (to, subject ,content) => {
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

exports.sendPurchaseEmail = async (to, user, cart) => {
	const content = await new Template().render('templates/purchaseEmail/index.pug',
		{ user, cart, meta })
	return await sendMailAndCatchErrors(to, `Recent Purchase at ${domain}`, content)
}

exports.sendSessionRequestEmail = async (to, student, time) => {
	const content = await new Template().render('templates/sendSessionRequestEmail/index.pug',
		{ student, meta, time })
	return await sendMailAndCatchErrors(to, 'Session Request', content)
}
