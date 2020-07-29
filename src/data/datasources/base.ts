export interface WhereCondition {
	field: string
	condition: "<" | "<=" | "==" | ">=" | ">" | "array-contains" | "in" | "array-contains-any"
	value: any
}
export interface GetClauses {
	limit?: number
	where?: WhereCondition[],
	order?: {
		field: string
		desc: boolean
	}
}

export default interface BaseSource {
	find: (collection: string, id: string) => Promise<object | undefined>,
	get: (collection: string, conditions: GetClauses) => Promise<object[]>,
	create: (collection: string, data: object) => Promise<object>,
	update: (collection: string, id: string, data: object) => Promise<object>
}
