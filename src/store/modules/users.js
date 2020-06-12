import { firestore } from '@/config/firebase'

const helpers = {
	updateProfile: async (bio, id) => await firestore.collection('users').doc(id).set({ bio }, { merge: true })
}

let url = process.env.NODE_ENV === 'production' ? 'https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/' : 'http://localhost:3000/stranerd/'

const state = {
	images: {
		slides: [
			url + encodeURIComponent('assets/slides_1.jpg'),
			url + encodeURIComponent('assets/slides_2.jpg'),
			url + encodeURIComponent('assets/slides_3.jpg')
		],
		what_we_do: [
			url + encodeURIComponent('assets/what_we_do_1.jpg'),
			url + encodeURIComponent('assets/what_we_do_2.jpg'),
			url + encodeURIComponent('assets/what_we_do_3.jpg')
		],
		students:[
			url + encodeURIComponent('assets/icons/Cassette.svg'),
		],
		logo: url + encodeURIComponent('assets/stranerd_logo.png') + '?alt=media',
		what_makes_us_different: url + encodeURIComponent('assets/what_makes_us_different.jpg') + '?alt=media',
		mckenwin: url + encodeURIComponent('assets/mckenwin.jpg') + '?alt=media',
		icons: {
			unlimited_access: url + encodeURIComponent('assets/icons/Unlimited Access.svg') + '?alt=media',
			study_anywhere: url + encodeURIComponent('assets/icons/Study Anywhere.svg') + '?alt=media',
			expert_teacher: url + encodeURIComponent('assets/icons/Expert Teacher.svg') + '?alt=media',
			test_preps: url + encodeURIComponent('assets/icons/Test Preps.svg') + '?alt=media',
			post_questions: url + encodeURIComponent('assets/icons/Post Questions.svg') + '?alt=media',
		},
		defaultImage: url + encodeURIComponent('users/images/user_profile.png') + '?alt=media'
	},
	intendedRoute: null,
	createPost: null,
	editMeta: null
}

const getters = {
	getDefaultImage: state => state.images.defaultImage,
	getImages: state => state.images,
	getIntendedRoute: state => state.intendedRoute,
	getCreatePost: state => state.createPost,
	getEditMeta: state => state.editMeta
}

const mutations = {
	setIntendedRoute: (state, route) => state.intendedRoute = route,
	setCreatePost: (state, post) => state.createPost = post,
	setEditMeta: (state, meta) => state.editMeta = meta,
}


const actions = {
	setIntendedRoute: ({ commit }, route) => commit('setIntendedRoute', route),
	clearIntendedRoute: ({ commit }) => commit('setIntendedRoute', null),
	setCreatePost: ({ commit }, post) => commit('setCreatePost', post),
	clearCreatePost: ({ commit }) => commit('setCreatePost', null),
	setEditMeta: ({ commit }, meta) => commit('setEditMeta', meta),
	clearEditMeta: ({ commit }) => commit('setEditMeta', null),
	async updateProfile({ getters }, data){
		let bio = data.bio
		let image = data.image
		if(image){
			bio.image = await window.uploadFile('users/images', image)
		}
		return await helpers.updateProfile(bio, getters.getId)
	}
}

export default { state, getters, mutations, actions }