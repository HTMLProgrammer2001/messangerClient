export type IUser = {
	avatar?: string,
	name: string,
	nickname: string,
	phone?: string,
	description?: string,
	role?: number,
	id: number,
	opts: Record<string, any>
};
