const path = require('path')

module.exports = {
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src/presentation'),
			'@data': path.join(__dirname, 'src/data'),
			'@repositories': path.join(__dirname, 'src/repositories')
		}
	}
}
