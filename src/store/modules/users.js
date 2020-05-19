const state = {
	defaultImage: 'http://localhost:3000/stranerd/users/images/Cassette.svg',
	intendedRoute: null
}

const getters = {
	getDefaultImage: state => state.defaultImage,
	getIntendedRoute: (state) => state.intendedRoute,
}

const mutations = {
	setIntendedRoute: (state, route) => (state.intendedRoute = route)
}

const actions = {
	setIntendedRoute: ({ commit }, route) => commit('setIntendedRoute', route),
	clearIntendedRoute: ({ commit }) => commit('setIntendedRoute', null),
}

export default { state, getters, mutations, actions }