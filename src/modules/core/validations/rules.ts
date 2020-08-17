import validate from 'validate.js'
import { extractTextFromHTML } from '@root/modules/core/validations/sanitizers'

export const isRequired = (value: any) => {
	return validate.single(value, { presence: true })
}

export const isNotRequired = (value: any) => {
	if(value === null) return [ 'cannot be null' ]
	return undefined
}

export const isRequiredIf = (value: any, condition: boolean) => {
	if(value === null) return [ 'cannot be null' ]
	if(condition && value === undefined) return [ 'is required' ]
	return undefined
}

export const isEmail = (value: string) => {
	return validate.single(value, { presence: true, email: true })
}

export const isLongerThan = (length: number, value: string) => {
	return validate.single(value?.trim() ?? '', { presence:true, length: { minimum: length }})
}

export const isNotLongerThan = (length: number, value: string) => {
	return validate.single(value?.trim() ?? '', { presence:true, length: { maximum: length }})
}

export const isExtractedHTMLLongerThan = (length: number, value: string) => {
	return validate.single(extractTextFromHTML(value ?? ''), { presence:true, length: { minimum: length }})
}

export const hasMoreThan = (length: number, value: any[]) => {
	return validate.single(value, { presence:true, length: { minimum: length }})
}

export const hasLessThan = (length: number, value: any[]) => {
	return validate.single(value, { presence:true, length: { maximum: length }})
}

export const isEqualTo = (value: any, compare: any) => {
	if(value === compare) return undefined
	return [ 'doesn\'t match' ]
}

export const isImageOrMedia = (file: any) => {
	if(file?.type?.startsWith('image/')) return undefined
	return [ 'is not an image' ]
}

export const isVideoOrMediaOrUndefined = (file: any) => {
	if(file === undefined) return undefined
	if(file?.type?.startsWith('video/')) return undefined
	return [ 'is not a video' ]
}

export const isMedia = (file: any) => {
	if(file?.type) return undefined
	return [ 'is not a valid file' ]
}

export const containsOnlyMedia = (files: any[]) => {
	if(files.every(file => file?.type)) return undefined
	return [ 'contains invalid files' ]
}

export const isMoreThan = (value: any, compare: any) => {
	if(value > compare) return undefined
	return [ `must be greater than ${compare}` ]
}
