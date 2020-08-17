export type Rules = ((value: any) => undefined | string[])[]

export class ValidatorService {
	static test(value: any, rules: Rules) : { isValid: boolean, message: string | undefined } {
		if(rules.length === 0) return { isValid: true, message: undefined }
		const checks = rules.map((rule) => {
			const error = rule(value)
			return { valid: error === undefined, message: error?.[0] ?? undefined }
		})
		const isValid = checks.every(r => r.valid)
		const message = checks.find(r => !r.valid)?.message ?? undefined
		return { isValid, message }
	}
}
