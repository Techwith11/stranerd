import { extractTextFromHTML } from '@modules/core/validations/sanitizers'

export const isRequired = (value: any) => {
	if(value === undefined || value === null || value === '') return { valid: false, error: 'is required' }
	return { valid: true, error: undefined }
}

export const isNotRequired = (value: any) => {
	if(value === null) return { valid: false, error: 'cannot be null' }
	return { valid: true, error: undefined }
}

export const isRequiredIf = (value: any, condition: boolean) => {
	if(value === null) return { valid: false, error: 'cannot be null' }
	if(condition && value === undefined) return { valid: false, error: 'is required' }
	return { valid: true, error: undefined }
}

export const isEmail = (value: string) => {
	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const valid = emailRegex.test(value)
	if(valid) return { valid: true, error: undefined }
	return { valid: false, error: 'is not a valid email' }
}

export const isLongerThan = (length: number, value: string) => {
	if((value?.trim() ?? '').length >= length) return { valid: true, error: undefined }
	return { valid: false, error: `must contain at least ${length} characters` }
}

export const isNotLongerThan = (length: number, value: string) => {
	if((value?.trim() ?? '').length <= length) return { valid: true, error: undefined }
	return { valid: false, error: `must contain not more than ${length} characters` }
}

export const isExtractedHTMLLongerThan = (length: number, value: string) => {
	return isLongerThan(length, extractTextFromHTML(value ?? ''))
}

export const hasMoreThan = (length: number, value: any[]) => {
	if(value?.length >= length) return { valid: true, error: undefined }
	return { valid: false, error: `must contain at least ${length} items` }
}

export const hasLessThan = (length: number, value: any[]) => {
	if(value?.length <= length) return { valid: true, error: undefined }
	return { valid: false, error: `must contain not more than ${length} items` }
}

export const isEqualTo = (value: any, compare: any) => {
	if(value === compare) return { valid: true, error: undefined }
	return { valid: false, error: 'doesn\'t match' }
}

export const isImageOrMedia = (file: any) => {
	if(file?.type?.startsWith('image/')) return { valid: true, error: undefined }
	return { valid: false, error: 'is not an image' }
}

export const isVideoOrMediaOrUndefined = (file: any) => {
	if(file === undefined) return { valid: true, error: undefined }
	if(file?.type?.startsWith('video/')) return { valid: true, error: undefined }
	return { valid: false, error: 'is not a video' }
}

export const isMedia = (file: any) => {
	if(file?.type) return { valid: true, error: undefined }
	return { valid: false, error: 'is not a valid file' }
}

export const isMediaOrUndefined = (file: any) => {
	if(file === undefined || file?.type) return { valid: true, error: undefined }
	return { valid: false, error: 'is not a media' }
}

export const containsOnlyMedia = (files: any[]) => {
	if(files.every((file) => file?.type)) return { valid: true, error: undefined }
	return { valid: false, error: 'contains invalid files' }
}

export const isMoreThan = (value: any, compare: any) => {
	if(value > compare) return { valid: true, error: undefined }
	return { valid: false, error: `must be greater than ${compare}` }
}
