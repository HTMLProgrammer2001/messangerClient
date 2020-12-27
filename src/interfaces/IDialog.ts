export type IDialog = {
	_id: string,
	nick?: string,
	avatar?: string,
	name: string,
	lastMessage?: {
		text: string,
		time: string		
	},
	unreaded: number
};
