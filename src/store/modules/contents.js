import firebase, { firestore, functions, storage } from '@/config/firebase'

let uploadFile = async (path, file) => {
	try{
		let link = `${path}/${Date.now()}_${file.name}`
		if(process.env.NODE_ENV === 'production'){
			await storage.ref(link).put(file)
			link = await storage.ref(path).getDownloadURL()
		}else{
			link = `stranerd/${link}`
			await window.uploadToMockServer(link, file)
			link = `http://localhost:3000/${link}`
		}
		new window.Toast({ icon: 'success', title: `${file.name} uploaded successfully` })
		return { name: file.name, link, type: file.type }
	}catch{ throw new Error(`Error uploading ${file.name}`) }
}

let createPost = async (post, id) => {
	let result = await functions.httpsCallable('createPost')({ post, id })
	return result.data
}
let createQuestion = async question => {
	question.createdAt = firebase.firestore.FieldValue.serverTimestamp()
	return await firestore.collection('questions').add(question)
}
let createCourse = async (course, id) => {
	course.dates = {}
	course.dates.createdAt = firebase.firestore.FieldValue.serverTimestamp()
	course.dates.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
	course.savedBy = []
	course.userId = id
	return await firestore.collection('courses').add(course)
}

const actions = {
	async createPost({ getters }, data){
		let post = data.post
		post.media = []
		for (const file of data.media) {
			let media = await uploadFile('post/images', file)
			post.media.push(media)
		}
		return await createPost(post, getters.getId)
	},
	async createQuestion(store, data){
		return await createQuestion(data)
	},
	async createCourse({ getters }, data){
		let course = data.course
		course.video = await uploadFile('courses/videos', data.video)
		course.image = await uploadFile('courses/images', data.image)
		course.premium ? course.preview = await uploadFile('courses/previews', data.preview) : null
		course.documents = []
		for (const file of data.documents) {
			let media = await uploadFile('courses/documents', file)
			course.documents.push(media)
		}
		return await createCourse(course, getters.getId)
	}
}

export default { actions }