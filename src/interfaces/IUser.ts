export type IUser = {
	_id: string,
	avatar?: string,
	name: string,
	nickname: string,
	phone?: string,
	description?: string,
	role?: number,
	isBanned: boolean,
	isOnline: boolean,
	lastSeen: number,
	opts?: Record<string, any>
};
