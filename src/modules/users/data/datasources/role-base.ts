export abstract class RoleBaseDataSource {
	public abstract makeAdmin: (data: { id: string }) => Promise<void>
	public abstract removeAdmin: (data: { id: string }) => Promise<void>
	public abstract makeTutor: (data: { id: string, course: string }) => Promise<void>
	public abstract subscribeToMailingList: (data: { email: string }) => Promise<void>
}
