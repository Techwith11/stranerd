const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

export const saveToAlgolia = async (collection, id ,data) => {
	const client = algoliaSearch(algolia.app_id, algolia.api_key)
	const index = client.initIndex(collection)
	try{
		data.objectID = id
		await index.saveObject(data)
	}catch (e) {
		console.warn(`Error saving ${id} in collection ${collection} to algolia`)
	}
}

export const deleteFromAlgolia = async (collection, id) => {
	const client = algoliaSearch(algolia.app_id, algolia.api_key)
	const index = client.initIndex(collection)
	try{
		await index.deleteObject(id)
	}catch (e) {
		console.warn(`Error deleting ${id} in collection ${collection} from algolia`)
	}
}
