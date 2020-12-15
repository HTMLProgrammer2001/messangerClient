export type IDialog = {
	id: number,
	nick: string,
	avatar?: string,
	name: string,
	lastMessage?: {
		text: string,
		time: string		
	},
	unreaded: number
};
