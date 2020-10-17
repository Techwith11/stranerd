import { uploadFile } from '@root/services/firebase'
import { Media } from '@modules/core/data/models/base'

export const UploaderService = {
	call: async (path: string, file: File) :Promise<Media> => {
		return await uploadFile(path, file) as Media
	}
}

const url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`
export const DEFAULT_IMAGE_URL = process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png'
