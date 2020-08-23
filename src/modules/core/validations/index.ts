export type Rules = ((value: any) => { valid: boolean, error: undefined | string })[]

export class ValidatorService {
	static test(value: any, rules: Rules) : { isValid: boolean, message: string | undefined } {
		if(rules.length === 0) return { isValid: true, message: undefined }
		const checks = rules.map((rule) => rule(value))
		const isValid = checks.every((r) => r.valid)
		const message = checks.find((r) => !r.valid)?.error ?? undefined
		return { isValid, message }
	}
}
