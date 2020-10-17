import { BaseFactory } from '@modules/core/domains/factories/base'
import { Module, SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'
import { hasMoreThan, isImageOrMedia, isLongerThan, isRequired } from '@modules/core/validations/rules'
import { Media } from '@modules/core/data/models/base'

type Content = File | Media
const isLongerThan3 = (value: string) => isLongerThan(3, value)
const hasMoreThan1 = (value: any[]) => hasMoreThan(1, value)

export class SubjectFactory extends BaseFactory<SubjectEntity, SubjectToModel> {
	public rules = {
		name: [isRequired, isLongerThan3],
		image: [isRequired, isImageOrMedia],
		modules: [isRequired, hasMoreThan1],
		moduleName: [isRequired, isLongerThan3],
		moduleImage: [isRequired, isImageOrMedia]
	}
	public values: { name: string, image: Content | undefined, modules: { name: string, image: Content }[], moduleName: string, moduleImage: Content | undefined} = {
		name: '', image: undefined, modules: [], moduleName: '', moduleImage: undefined
	}
	public validValues: { name: string, image: Content | undefined, modules: { name: string, image: Content }[], moduleName: string, moduleImage: Content | undefined} = {
		name: '', image: undefined, modules: [], moduleName: '', moduleImage: undefined
	}
	public errors = { name: undefined, image: undefined, modules: undefined, moduleName: undefined, moduleImage: undefined }

	get name(){ return this.values.name }
	set name(value: string) { this.set('name', value.toLowerCase()) }
	get moduleName(){ return this.values.moduleName }
	get image(){ return this.values.image! }
	set image(file: Content) { this.set('image', file) }
	set moduleName(value: string) { this.set('moduleName', value.toLowerCase()) }
	get moduleImage(){ return this.values.moduleImage! }
	set moduleImage(file: Content) { this.set('moduleImage', file) }
	get moduleValid(){ return this.isValid('moduleImage') && this.isValid('moduleName')}
	get modules(){ return this.values.modules }
	addModule(){
		const module = {
			name: this.validValues.moduleName.toLowerCase(),
			image: this.validValues.moduleImage
		} as { name: string, image: Content }
		const modules = this.values.modules

		const index = modules.findIndex((m) => m.name === module.name)
		if(index !== -1) modules[index] = module
		else modules.push(module)

		const res = this.set('modules', modules)
		this.validValues.moduleName = this.values.moduleName = ''
		this.validValues.moduleImage = this.values.moduleImage = undefined
		this.errors.moduleName = this.errors.moduleImage = undefined
		return res
	}
	removeModule(module: string){
		return this.set('modules', this.values.modules.filter((m) => m.name.toLowerCase() !== module.toLowerCase()))
	}

	get valid(){ return this.isValid('name') && this.isValid('image') && this.isValid('modules') }

	public loadEntity = (entity: SubjectEntity) => {
		this.name = entity.name
		this.image = entity.imageData
		this.set('modules', entity.modules.map((m) => ({ name: m.name, image: m.imageData })))
	}

	public toModel = async () => {
		if(this.valid){
			if(this.image instanceof File) this.image = await this.uploadFile('subjects', this.image)
			const modules = await Promise.all(this.validValues.modules.map(async (m) => {
				if(m.image instanceof File) m.image = await this.uploadFile(`subjects/${this.validValues.name}/modules`, m.image)
				return m as Module
			}))
			return {
				name: this.validValues.name,
				image: this.validValues.image as Media,
				modules
			}
		}else{
			throw new Error('Validation errors')
		}
	}
}
