export const deleteFromStorage = async (url: string | undefined) => {
	try{
		//TODO: Figure out how to delete from storage in admin sdk
		//const ref = admin.storage().refFromURL(url ?? '')
		//if(ref.exists) await ref.delete()
		console.log(`Delete ${url}`)
	}catch(error){
		console.warn(error)
	}
}
