import firebase, { firestore, functions } from '@/config/firebase'

let helpers = {
	createPost: async (post, id) => {
		let result = await functions.httpsCallable('createPost')({ post, id })
		return result.data
	},
	createQuestion: async (question, id) => {
		question.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
		question.userId = id
		return await firestore.collection('questions').add(question)
	},
	createCourse: async (course, id) => {
		course.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() }
		course.savedBy = []
		course.userId = id
		return await firestore.collection('courses').add(course)
	},
	createNote: async (note, id) => {
		note.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
		note.userId = id
		return await firestore.collection('notes').add(note)
	}
}

const actions = {
	async createPost({ getters }, data){
		let post = data.post
		post.media = []
		for (const file of data.media) {
			let media = await window.uploadFile('post/images', file)
			post.media.push(media)
		}
		return await helpers.createPost(post, getters.getId)
	},
	async createQuestion({ getters }, data){
		return await helpers.createQuestion(data, getters.getId)
	},
	async createCourse({ getters }, data){
		let course = data.course
		course.video = await window.uploadFile('courses/videos', data.video)
		course.image = await window.uploadFile('courses/images', data.image)
		course.premium ? course.preview = await window.uploadFile('courses/previews', data.preview) : null
		course.documents = []
		for (const file of data.documents) {
			let media = await window.uploadFile('courses/documents', file)
			course.documents.push(media)
		}
		return await helpers.createCourse(course, getters.getId)
	},
	async createNote({ getters }, data){
		let note = data.note
		note.document = await window.uploadFile('notes', data.document)
		return await helpers.createNote(note, getters.getId)
	}
}

export default { actions }