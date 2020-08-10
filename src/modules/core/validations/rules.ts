import validate from 'validate.js'
import { extractTextFromHTML } from '@root/modules/core/validations/sanitizers'

export const isRequired = (value: string) => {
    return validate.single(value, { presence: true })
}

export const isEmail = (value: string) => {
    return validate.single(value, { presence: true, email: true })
}

export const isLongerThan = (length: number, value: string) => {
    return validate.single(value.trim(), { presence:true, length: { minimum: length }})
}

export const isExtractedHTMLLongerThan = (length: number, value: string) => {
    return validate.single(extractTextFromHTML(value), { presence:true, length: { minimum: length }})
}

export const hasMoreThan = (length: number, value: any[]) => {
    return validate.single(value, { presence:true, length: { minimum: length }})
}

export const hasLessThan = (length: number, value: any[]) => {
    return validate.single(value, { presence:true, length: { maximum: length }})
}
