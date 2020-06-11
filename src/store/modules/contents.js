import firebase, { firestore, functions } from '@/config/firebase'

let helpers = {
	createPost: async (post, id) => (await functions.httpsCallable('createPost')({ post, id })).data,
	upvoteReply: async (data) => (await functions.httpsCallable('upvoteReply')(data)).data,
	downvoteReply: async (data) => (await functions.httpsCallable('downvoteReply')(data)).data,
	createQuestion: async (question, id) => {
		question.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
		question.userId = id
		return await firestore.collection('tests/tutors/questions').add(question)
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
	},
	uploadFromEditor: async data => {
		let res = await window.uploadFile(data.path, data.file)
		data.editor.insertEmbed(data.cursorLocation, "image", res.link)
		data.resetUploader()
	},
	createBlogPost: async (post, id) => {
		post.dates = { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
		post.userId = id
		return await firestore.collection('blog').add(post)
	},
	deleteQuestion: async (id) => await firestore.collection('tests/tutors/questions').doc(id).delete(),
	deleteNote: async (id) => await firestore.collection('notes').doc(id).delete(),
	deleteBlogPost: async (id) => await firestore.collection('blog').doc(id).delete(),
	editQuestion: async (question) => {
		let id = question['.key']
		delete question['.key']
		question.dates.updatedAt =  firebase.firestore.FieldValue.serverTimestamp()
		return await firestore.collection('tests/tutors/questions').doc(id).set(question, { merge: true })
	},
	editNote: async (note) => {
		let id = note['.key']
		delete note['.key']
		note.dates.updatedAt =  firebase.firestore.FieldValue.serverTimestamp()
		return await firestore.collection('notes').doc(id).set(note, { merge: true })
	}
}

const actions = {
	createPost: async ({ getters }, post) => await helpers.createPost(post, getters.getId),
	upvoteReply: async ({ getters }, data) => await helpers.upvoteReply({ ...data, id: getters.getId }),
	downvoteReply: async ({ getters }, data) => await helpers.downvoteReply({ ...data, id: getters.getId }),
	createQuestion: async ({ getters }, data) => await helpers.createQuestion(data, getters.getId),
	createCourse: async ({ getters }, data) => {
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
	createNote: async ({ getters }, data) => {
		let note = data.note
		note.document = await window.uploadFile('notes', data.document)
		return await helpers.createNote(note, getters.getId)
	},
	createBlogPost: async ({ getters }, data) => {
		let post = data.post
		post.image = await window.uploadFile('blog', data.image)
		return await helpers.createBlogPost(post, getters.getId)
	},
	uploadFromEditor: async (store, data) => await helpers.uploadFromEditor(data),

	deleteQuestion: async (store, id) => await helpers.deleteQuestion(id),
	deleteNote: async (store, id) => await helpers.deleteNote(id),
	deleteBlogPost: async (store, id) => await helpers.deleteBlogPost(id),

	editQuestion: async (store, question) => await helpers.editQuestion(question),
	editNote: async (store, { note, document}) => {
		if(document.size){
			note.document = await window.uploadFile('notes', document)
		}
		return await helpers.editNote(note)
	}
}

export default { actions }