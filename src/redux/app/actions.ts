import {APP_INITIALIZE_SUCCESS, APP_INITIALIZE_START, APP_INITIALIZE_ERROR} from './types';


export const appInitializeStart = () => <const>({
	type: APP_INITIALIZE_START
});

export const appInitializeError = () => <const>({
	type: APP_INITIALIZE_ERROR
});

export const appInitializeSuccess = () => <const>({
	type: APP_INITIALIZE_SUCCESS
});
