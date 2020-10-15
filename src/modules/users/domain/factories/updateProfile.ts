import { BaseFactory } from '@modules/core/domains/factories/base'
import { isRequired, isLongerThan } from '@modules/core/validations/rules'
import { Media } from '@modules/core/data/models/base'
import { UserFromModel } from '@modules/users/data/models/user'

type Profile = { name: string, bio: string, image?: Media }
type MediaContent = File | Media
const isLongerThan3 = (value:string) => isLongerThan(3, value)

export class UpdateProfileFactory extends BaseFactory<UserFromModel, Profile> {
	public readonly rules = {
		name: [isRequired, isLongerThan3],
		bio: [isRequired, isLongerThan3],
		image: []
	}

	public errors = { name: undefined, bio: undefined, image: undefined }

	public values: { name: string, bio: string,image: MediaContent | undefined } = { name: '', bio: '', image: undefined }
	public validValues: { name: string, bio: string,image: MediaContent | undefined } = { name: '', bio: '', image: undefined }

	get name(){ return this.values.name }
	set name(value: string){ this.set('name', value) }
	get bio(){ return this.values.bio }
	set bio(value: string){ this.set('bio', value) }
	get image(){ return this.values.image! }
	set image(file: MediaContent){ this.set('image', file) }

	public toModel = async () => {
		if(this.valid){
			const res: Profile = {
				name: this.validValues.name,
				bio: this.validValues.bio,
			}
			if(this.image){
				if(this.image instanceof File){
					this.image = await this.uploadFile('blog', this.image)
				}
				res.image = this.validValues.image as Media
			}
			return res
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: UserFromModel) => {
		//TODO: Replace type UserFromModel with UserEntity on implementing user listener as UserEntity
		this.name = entity.bio.name
		this.bio = entity.bio.bio
		this.image = entity.bio.image
	}

}
