const functions = require('firebase-functions')
const admin = require('firebase-admin');
const nodemailer = require('nodemailer')
const Email = require('email-templates')

let environment = functions.config().environment.mode
let data = functions.config().admin[environment]
let email = data.email.email
let pass = data.email.pass
let domain = data.meta.domain
let storage = data.meta.storage
let meta = {
	logo: `${storage}/assets/stranerd_logo.png`,
	color: data.meta.color,
	domain
}

exports.sendPurchaseEmail = async (to, user, cart) => {
	let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: email, pass } })
	let content = await new Email().render('templates/purchaseEmail/index.pug', { user, cart, meta })
	try{
		return await transporter.sendMail({
			from: `Stranerd`,
			to,
			subject: `Recent Purchase at ${domain}`,
			html: content
		})
	}catch(error){
		await admin.firestore().collection('errors/types/emails').add({
			error: error.message,
			type: 'sendPurchaseEmail',
			arguments: { 0: to, 1: user, 2: cart },
			dates: { triedAt: admin.firestore.FieldValue.serverTimestamp() }
		})
		return error
	}
}