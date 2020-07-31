const path = require('path')

module.exports = {
	resolve: {
		alias: {
			'@root': path.join(__dirname, 'src'),
			'@': path.join(__dirname, 'src/application'),
		}
	}
}
