export const extractTextFromHTML = (html: string) => html?.trim().replace(/<[^>]+>/g, '') ?? ''

export const trimToLength = (body: string, length: number) => {
	const replaced = body.replace(/<[^>]+>/g, '')
	if(replaced.length < length){ return replaced }
	const index = replaced.indexOf(' ', length)
	return `${replaced.slice(0, index)}...`
}
