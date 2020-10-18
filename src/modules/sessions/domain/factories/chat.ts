import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isMediaOrUndefined, isRequired, isRequiredIf } from '@modules/core/validations/rules'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'
import { Media } from '@modules/core/data/models/base'

type Content = Media | File | undefined
const isLongerThan3OrUndefined = (value: string | undefined) => {
	if(value === undefined) return { valid: true, error: undefined }
	else return isLongerThan(3, value)
}
export class ChatFactory extends BaseFactory<ChatEntity, ChatToModel> {
	readonly rules = {
		content: [(val: any)=>isRequiredIf(val, !this.media),isLongerThan3OrUndefined],
		from: [isRequired],
		media: [(val: any)=>isRequiredIf(val, !this.content), isMediaOrUndefined ]
	}
	public values = {
		content: '', from: '', media: undefined
	} as { content: string | undefined, from: string, media: Content | undefined}
	public validValues = {
		content: '', from: '', media: undefined
	} as { content: string | undefined, from: string, media: Content | undefined}
	public errors = {
		content: undefined, from: undefined, media: undefined
	}

	get content(){ return this.values.content }
	set content(value: string | undefined){ this.set('content', value) }
	get from(){ return this.values.from }
	set from(value: string){ this.set('media', value) }
	get media(){ return this.values.media }
	set media(value: Content){ this.set('media', value) }

	public toModel = async () => {
		if(this.valid){
			if(this.media instanceof File) this.media = await this.uploadFile('sessions/chats', this.media)
			return {
				...(this.validValues.content ? { content: this.validValues.content } : {} ),
				...(this.validValues.media ? { media: this.validValues.media as Media } : {} ),
				from: this.validValues.from,
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ChatEntity) => {
		throw Error(`Cannot load an entity into this factory, ${entity}`)
	}

}
