import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { Module, SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { SubjectToModel } from '@root/modules/courses/data/models/subject'
import { hasMoreThan, isLongerThan, isRequired } from '@root/modules/core/validations/rules'
import { Media } from '@root/modules/core/data/models/base'

const isLongerThan3 = (value: string) => isLongerThan(3, value)
const hasMoreThan1 = (value: any[]) => hasMoreThan(1, value)

export class SubjectFactory extends BaseFactory<SubjectEntity, SubjectToModel> {
	public rules = {
		name: [isRequired, isLongerThan3],
		modules: [isRequired, hasMoreThan1]
	}
	public values: { name: string, modules: { name: string, image: File | Media }[]} = {
		name: '', modules: []
	}
	public validValues: { name: string, modules: { name: string, image: File | Media }[]} = {
		name: '', modules: []
	}
	public errors = { name: undefined, modules: undefined }

	get name(){ return this.values.name }
	set name(value: string) { this.set('name', value) }
	get modules(){ return this.values.modules }
	addModule(module: { name: string, image: File }){
		if(!this.values.modules.find(m => m.name === module.name)) this.set('modules', [...this.values.modules, module])
		return false
	}
	removeModule(module: string){
		return this.set('modules', this.values.modules.filter(m => m.name.toLowerCase() !== module.toLowerCase()))
	}

	public loadEntity = (entity: SubjectEntity) => {
		this.name = entity.name
		this.set('modules', entity.modules)
	}

	public toModel = async () => {
		if(this.valid){
			const modules = await Promise.all(this.validValues.modules.map(async m => {
				if(m.image instanceof File) m.image = await this.uploadFile('subjects/modules', m.image)
				return m as Module
			}))
			return {
				name: this.validValues.name,
				modules
			}
		}else{
			throw new Error('Validation errors')
		}
	}
}
