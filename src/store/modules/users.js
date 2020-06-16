let url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`

const state = {
	defaultImage: process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png',
	intendedRoute: null,
	createPost: null,
	editMeta: null,
	scrollCache: {}
}

const getters = {
	getDefaultImage: state => state.defaultImage,
	getIntendedRoute: state => state.intendedRoute,
	getCreatePost: state => state.createPost,
	getEditMeta: state => state.editMeta,
	getScrollCache: state => state.scrollCache
}

const mutations = {
	setIntendedRoute: (state, route) => state.intendedRoute = route,
	setCreatePost: (state, post) => state.createPost = post,
	setEditMeta: (state, meta) => state.editMeta = { ...meta },
	setScrollCache: (state, { page, position }) => state.scrollCache[page] = position,
}

const actions = {
	setIntendedRoute: ({ commit }, route) => commit('setIntendedRoute', route),
	clearIntendedRoute: ({ commit }) => commit('setIntendedRoute', null),
	setCreatePost: ({ commit }, post) => commit('setCreatePost', post),
	clearCreatePost: ({ commit }) => commit('setCreatePost', null),
	setEditMeta: ({ commit }, meta) => commit('setEditMeta', meta),
	clearEditMeta: ({ commit }) => commit('setEditMeta', null),
	setScrollCache: ({ commit }, meta) => commit('setScrollCache', meta)
}

export default { state, getters, mutations, actions }