const path = require('path')

module.exports = {
	resolve: {
		alias: {
			'@root': path.join(__dirname, 'src'),
			'@': path.join(__dirname, 'src/presentation'),
			'@data': path.join(__dirname, 'src/data'),
			'@domain': path.join(__dirname, 'src/domain')
		}
	}
}
