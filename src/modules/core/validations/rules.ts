import validate from 'validate.js'

export const isRequired = (value: string) => {
    return validate.single(value, { presence: true })
}

export const isEmail = (value: string) => {
    return validate.single(value, { presence: true, email: true })
}

export const isLongerThan = (length: number, value: string) => {
    return validate.single(value, { presence:true, length: { minimum: length }})
}
