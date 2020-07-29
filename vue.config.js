const path = require('path')

module.exports = {
	chainWebpack: config => {
		config.resolve.alias
			.set('@root', path.join(__dirname, 'src'))
			.set('@', path.join(__dirname, 'src/presentation'))
			.set('@data', path.join(__dirname, 'src/data'))
			.set('@domain', path.join(__dirname, 'src/domain'))
			.set('@types', path.join(__dirname, 'src/types'))
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: '@import "~@/style/variables.scss";'
			}
		}
	},
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/config/service_worker.js',
			importWorkboxFrom: 'local'
		},
		msTileColor: '#FFFFFF',
		manifestOptions: {
			name: "Stranerd",
			short_name: "Stranerd",
			start_url: ".",
			theme_color: "#FFC000",
			background_color: "#FFFFFF",
			display: "standalone",
			orientation: "portrait-primary",
			icons: [
				{
					"src": "./img/icons/android-chrome-192x192.png",
					"sizes" :"192x192",
					"type": "image/png"
				},
				{
					"src": "./img/icons/android-chrome-512x512.png",
					"sizes": "512x512",
					"type":"image/png"
				},
				{
					"src": "./img/icons/android-chrome-maskable-192x192.png",
					"sizes": "192x192",
					"type":"image/png",
					"purpose": "maskable"
				},
				{
					"src": "./img/icons/android-chrome-maskable-512x512.png",
					"sizes": "512x512",
					"type": "image/png",
					"purpose": "maskable"
				}
			]
		}
	}
}
