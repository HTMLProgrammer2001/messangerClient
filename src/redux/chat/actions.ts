import {CHAT_LOAD_START, CHAT_LOAD_ERROR, CHAT_LOAD_SUCCESS, CHAT_MORE} from './types';
import {IMessage} from '../../interfaces/IMessage';


export const chatLoadStart = () => <const>({
	type: CHAT_LOAD_START
});

export const chatLoadError = (error: string) => <const>({
	type: CHAT_LOAD_ERROR,
	error
});

export const chatLoadSuccess = (messages: Array<IMessage>) => <const>({
	type: CHAT_LOAD_SUCCESS,
	payload: messages
});

export const chatMore = () => <const>({
	type: CHAT_MORE
});
