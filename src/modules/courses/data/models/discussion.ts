export interface DiscussionFromModel {
	id: string
	body: string
	userId: string
	dates: {
		createdAt: number
	}
}

export interface DiscussionToModel {
	body: string
	userId: string
}
