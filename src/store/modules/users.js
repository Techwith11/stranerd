const state = {
	defaultImage: '/users/images/Cassette.svg'
}

const getters = {
	getDefaultImage: state => state.defaultImage
}

export default { state, getters }