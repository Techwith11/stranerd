import { uploadFile } from '@root/services/firebase'
import { Media } from '@root/modules/core/data/models/base'

export const UploaderService = {
	call: async (path: string, file: File) :Promise<Media> => {
		return await uploadFile(path, file) as Media
	}
}
