import { ref, watch } from '@vue/composition-api'

type callback = (tag: string) => void

export const useTags = (addCb: callback, removeCb: callback) => {
	const tag = ref('')
	const splitTag = () => {
		if(tag.value.includes(' ')){
			tag.value.split(' ').map(tag => {
				if(tag) addCb(tag.toLowerCase())
			})
			tag.value = ''
		}
	}
	watch(() => tag.value, splitTag)
	const removeTag = (tag: string) => removeCb(tag)

	return {
		tag, splitTag, removeTag
	}
}

export const useFileInputs = (cb: (file: File) => void) => {
	const catchFiles = (e: Event) => {
		const file = (e.target as HTMLInputElement)?.files?.[0] ?? undefined
		if(file) cb(file)
	}

	return {
		catchFiles
	}
}
