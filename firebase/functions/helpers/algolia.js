const algoliaSearch = require('algoliasearch')
const { environmentVariables } = require('./environment')
const { appId, apiKey } = environmentVariables.algolia
const client = algoliaSearch(appId, apiKey)

exports.saveToAlgolia = async (collection, id ,data) => {
	const index = client.initIndex(collection)
	try{
		data.objectID = id
		await index.saveObject(data)
	}catch (e) {
		console.warn(`Error saving ${id} in collection ${collection} to algolia`)
	}
}

exports.deleteFromAlgolia = async (collection, id) => {
	const index = client.initIndex(collection)
	try{
		await index.deleteObject(id)
	}catch (e) {
		console.warn(`Error deleting ${id} in collection ${collection} from algolia`)
	}
}
