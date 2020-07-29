export default class BaseSource {
	async find(){ throw Error('Provide an implementation') }
	async get(){ throw Error('Provide an implementation') }
	async create(){ throw Error('Provide an implementation') }
	async update(){ throw Error('Provide an implementation') }
}
