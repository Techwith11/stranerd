const state = {
	postModalOpen: false,
	postModalMode: null
}

const getters = {
	isPostModalOpen: state => state.postModalOpen,
	isPostModalCreate: state => state.postModalMode === 'create'
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
	setPostModalCreate({ commit }){
		commit('setPostModalMode','create')
	},
	closePostModal({ commit }){ commit('closePostModal') }
}



export default { state, getters, mutations, actions}
