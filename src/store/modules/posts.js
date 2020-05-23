const state = {
	postModalOpen: false,
	postModalMode: null
}

const getters = {
	isPostModalOpen: state => state.postModalOpen,
	isPostModalNotify: state => state.postModalMode === 'post-notify',
	isPostModalCreate: state => state.postModalMode === 'post-create',
}

const mutations = {
	setPostModalMode: (state, mode) => {
		state.postModalMode = mode
		mode ? state.postModalOpen = true : null
	},
	closePostModal: state => {
		state.postModalOpen = false
		state.postModalMode = null
	}
}

const actions = {
	setPostModalCreate({ commit }){ commit('setPostModalMode','post-create')},
	setPostModalNotify({ commit }){ commit('setPostModalMode','post-notify')},
	closePostModal({ commit }){ commit('closePostModal') }
}



export default { state, getters, mutations, actions}
