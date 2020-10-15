import { BaseFactory } from '@modules/core/domains/factories/base'
import {
	isExtractedHTMLLongerThan, isLongerThan, isImageOrMedia, isRequired, isMoreThan, isMedia
} from '@modules/core/validations/rules'
import { NoteToModel } from '@modules/shop/data/models/note'
import { Media } from '@modules/core/data/models/base'
import { NoteEntity } from '@modules/shop/domain/entities/note'

type MediaContent = File | Media
const isLongerThan3 = (value: string) => isLongerThan(3, value)
const isMoreThan0 = (value: number) => isMoreThan(value, 0)
const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)

export class NoteFactory extends BaseFactory<NoteEntity, NoteToModel> {
	public rules = {
		title: [isRequired,isLongerThan3],
		description: [isRequired,isExtractedHTMLLongerThan3],
		price: [isRequired,isMoreThan0],
		userId: [isRequired],
		image: [isRequired, isImageOrMedia],
		document: [isRequired, isMedia],
	}
	public values: { title: string, description: string, price: number, userId: string, image: MediaContent | undefined, document: MediaContent | undefined } = {
		title: '', description: '', price: 0, userId: '', image: undefined, document: undefined
	}
	public validValues: { title: string, description: string, price: number, userId: string, image: MediaContent | undefined, document: MediaContent | undefined } = {
		title: '', description: '', price: 0, userId: '', image: undefined, document: undefined
	}
	public errors = {
		title: undefined, description: undefined, tags: undefined, userId: undefined, image: undefined
	}

	get title(){ return this.values.title }
	set title(value: string){ this.set('title', value) }
	get description(){ return this.values.description }
	set description(value: string){ this.set('description', value) }
	get price(){ return this.values.price }
	set price(value: number){ this.set('price', value) }
	get userId(){ return this.values.userId }
	set userId(value: string){ this.set('userId', value) }
	get image(){ return this.values.image! }
	set image(file: MediaContent){ this.set('image', file) }
	get document(){ return this.values.document! }
	set document(file: MediaContent){ this.set('document', file) }

	public toModel = async () => {
		if(this.valid){
			if(this.image instanceof File){
				this.image = await this.uploadFile('notes/images', this.image)
			}
			if(this.document instanceof File){
				this.document = await this.uploadFile('notes/documents', this.document)
			}
			return {
				title: this.validValues.title,
				description: this.validValues.description,
				price: this.validValues.price,
				userId: this.validValues.userId,
				image: this.validValues.image as Media,
				document: this.validValues.document as Media,
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: NoteEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.price = entity.price
		this.userId = entity.userId
		this.image = entity.image
		this.document = entity.document
	}

}
