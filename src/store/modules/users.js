const state = {
	defaultImage: 'http://localhost:5000/users/images/Cassette.svg'
}

const getters = {
	getDefaultImage: state => state.defaultImage
}

export default { state, getters }