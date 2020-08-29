const admin = require('firebase-admin')

module.exports.deleteFromStorage = async url => {
	try{
		const ref = admin.storage().refFromURL(url || '')
		if(ref.exists) await ref.delete()
	}catch(error){
		console.warn(error)
	}
}
