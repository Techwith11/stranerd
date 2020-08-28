const url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`

const state = {
	defaultImage: process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png',
}

const getters = {
	getDefaultImage: (s: typeof state) => s.defaultImage,
}

export default { state, getters }
