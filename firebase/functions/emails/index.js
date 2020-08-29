const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const Template = require('email-templates')
const { environmentVariables } = require('../helpers/environment')

const { email: { email, pass }, meta: { domain } } = environmentVariables.admin
const meta = { domain, logo: `${domain}/img/stranerd_logo.png` }


const sendMail = async (to, subject ,content) => {
	const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: email, pass } })
	await transporter.sendMail({
		from: `Stranerd`,
		to, subject,
		html: content
	})
}
module.exports.sendMail = sendMail

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

module.exports.sendPurchaseEmail = async (to, user, cart) => {
	const content = await new Template().render('templates/purchaseEmail/index.pug',
		{ user, cart, meta })
	return await sendMailAndCatchErrors(to, `Recent Purchase at ${domain}`, content)
}

module.exports.sendSessionRequestEmail = async (to, student, time) => {
	const content = await new Template().render('templates/sendSessionRequestEmail/index.pug',
		{ student, meta, time })
	return await sendMailAndCatchErrors(to, 'Session Request', content)
}
