const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const Email = require('email-templates')

let environment = functions.config().environment.mode
let admin = functions.config().admin[environment]
let email = admin.email.email
let pass = admin.email.pass
let domain = admin.meta.domain
let storage = admin.meta.storage
let meta = {
	logo: `${storage}/assets/stranerd_logo.png`,
	color: admin.meta.color,
	domain
}

let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: email, pass } })

exports.sendPurchaseEmail = async (to, user, cart) => {
	let content = await new Email().render('templates/purchaseEmail/index.pug', { user, cart, meta })
	return await transporter.sendMail({
		from: `Stranerd`,
		to,
		subject: `Recent Purchase at ${domain}`,
		html: content
	})
}