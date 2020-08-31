const algoliaSearch = require('algoliasearch')
const { environmentVariables } = require('./environment')
const { appId, apiKey } = environmentVariables.algolia

exports.saveToAlgolia = async (collection, id ,data) => {
	try{
		await algoliaSearch(appId, apiKey).initIndex(collection).saveObject({ ...data, objectID: id })
	}catch (e) {
		console.warn(`Error saving ${id} in collection ${collection} to algolia`)
	}
}

exports.deleteFromAlgolia = async (collection, id) => {
	try{
		await algoliaSearch(appId, apiKey).initIndex(collection).deleteObject(id)
	}catch (e) {
		console.warn(`Error deleting ${id} in collection ${collection} from algolia`)
	}
}
