import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { Module, SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { SubjectToModel } from '@root/modules/courses/data/models/subject'
import { hasMoreThan, isImageOrMedia, isLongerThan, isRequired } from '@root/modules/core/validations/rules'
import { Media } from '@root/modules/core/data/models/base'

type Content = File | Media
const isLongerThan3 = (value: string) => isLongerThan(3, value)
const hasMoreThan1 = (value: any[]) => hasMoreThan(1, value)

export class SubjectFactory extends BaseFactory<SubjectEntity, SubjectToModel> {
	public rules = {
		name: [isRequired, isLongerThan3],
		modules: [isRequired, hasMoreThan1],
		moduleName: [isRequired, isLongerThan3],
		moduleImage: [isRequired, isImageOrMedia]
	}
	public values: { name: string, modules: { name: string, image: Content }[], moduleName: string, moduleImage: Content | undefined} = {
		name: '', modules: [], moduleName: '', moduleImage: undefined
	}
	public validValues: { name: string, modules: { name: string, image: Content }[], moduleName: string, moduleImage: Content | undefined} = {
		name: '', modules: [], moduleName: '', moduleImage: undefined
	}
	public errors = { name: undefined, modules: undefined, moduleName: undefined, moduleImage: undefined }

	get name(){ return this.values.name }
	set name(value: string) { this.set('name', value.toLowerCase()) }
	get moduleName(){ return this.values.moduleName }
	set moduleName(value: string) { this.set('moduleName', value.toLowerCase()) }
	get moduleImage(){ return this.values.moduleImage! }
	set moduleImage(file: Content) { this.set('moduleImage', file) }
	get valid(){ return this.isValid('name') && this.isValid('modules')}
	get moduleValid(){ return this.isValid('moduleImage') && this.isValid('moduleName')}
	get modules(){ return this.values.modules }
	addModule(){
		const module = { name: this.validValues.moduleName.toLowerCase(), image: this.validValues.moduleImage }
		if(!this.values.modules.find((m) => m.name === module.name)) {
			const res = this.set('modules', [...this.values.modules, module])
			this.validValues.moduleName = this.values.moduleName = ''
			this.validValues.moduleImage = this.values.moduleImage = undefined
			this.errors.moduleName = this.errors.moduleImage = undefined
			return res
		}
		return false
	}
	removeModule(module: string){
		return this.set('modules', this.values.modules.filter((m) => m.name.toLowerCase() !== module.toLowerCase()))
	}

	public loadEntity = (entity: SubjectEntity) => {
		this.name = entity.name
		this.set('modules', entity.modules.map((m) => ({ name: m.name, image: m.imageData })))
	}

	public toModel = async () => {
		if(this.valid){
			const modules = await Promise.all(this.validValues.modules.map(async (m) => {
				if(m.image instanceof File) m.image = await this.uploadFile(`subjects/${this.validValues.name}/modules`, m.image)
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
