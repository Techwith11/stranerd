const state = {
	defaultImage: 'http://localhost:3000/stranerd/users/images/Cassette.svg'
}

const getters = {
	getDefaultImage: state => state.defaultImage
}

export default { state, getters }