const state = {
	postModalOpen: false,
	postModalMode: null
}

const getters = {
	isPostModalOpen: state => state.postModalOpen,
	isPostModalNotify: state => state.postModalMode === 'post-notify',
	isPostModalCreate: state => state.postModalMode === 'post-create',
	isPostModalBuyMore: state => state.postModalMode === 'buy-more',
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
	setPostModalBuyMore({ commit }){ commit('setPostModalMode','buy-more')},
	closePostModal({ commit }){ commit('closePostModal') }
}



export default { state, getters, mutations, actions}
