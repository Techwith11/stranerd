import { functions, storage } from '@/config/firebase'

let uploadFile = async (path, file) => {
	try{
		let link = null
		if(process.env.NODE_ENV === 'production'){
			await storage.ref(path).put(file)
			link = await storage.ref(path).getDownloadURL()
		}else{
			link = `http://localhost:5000/${path}`
		}
		return { name: file.name, link, type: file.type }
	}catch{ throw new Error(`Error uploading ${file.name}`) }
}

let createPost = async (post, id) => {
	let result = await functions.httpsCallable('createPost')({ post, id })
	return result.data
}

const actions = {
	async createPost({ getters }, data){
		let post = data.post
		for (const file of data.media) {
			let link = `posts/images/${Date.now()}_${file.name}`
			let media = await uploadFile(link, file)
			post.media.push(media)
		}
		return await createPost(post, getters.getId)
	}
}

export default { actions }