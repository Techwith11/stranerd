const functions = require('firebase-functions')

module.exports.isProduction = functions.config().environment.mode === 'production'
module.exports.isDev = functions.config().environment.mode === 'development'
