export interface IRoleRepository {
	makeTutor: (id: string, course: string) => Promise<void>
	makeAdmin: (id: string) => Promise<void>
	removeAdmin: (id: string) => Promise<void>
}
