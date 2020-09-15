import { Media } from '@root/modules/core/data/models/base'

export class SubjectEntity {
	public readonly id: string
	public readonly name: string
	public readonly imageData: Media
	public readonly modules: ModuleEntity[]

	constructor({ id, name, modules, imageData }: SubjectConstructorArgs) {
		this.id = id
		this.name = name
		this.imageData = imageData
		this.modules = modules.map((m) => new ModuleEntity(m))
	}

	get image(){ return this.imageData?.link ?? undefined }
}

export class ModuleEntity {
	public readonly name: string
	public readonly imageData: Media

	constructor({ name, image: imageData }: { name: string, image: Media }) {
		this.name = name
		this.imageData = imageData
	}

	get image(){ return this.imageData?.link ?? undefined }
}

export type Module = { name: string, image: Media }
type SubjectConstructorArgs = { id: string, name: string, imageData: Media, modules: Module[]  }
