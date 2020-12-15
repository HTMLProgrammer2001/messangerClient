import {IDialog} from '../../interfaces/IDialog';
import {
	DIALOGS_LOAD_ERROR, 
	DIALOGS_LOAD_START, 
	DIALOGS_LOAD_SUCCESS, 
	DIALOGS_GET, 
	DIALOGS_CURRENT_CHANGE
} from './types';


export const dialogsLoadStart = () => <const>({
	type: DIALOGS_LOAD_START
});

export const dialogsLoadError = (error: string) => <const>({
	type: DIALOGS_LOAD_ERROR,
	error
});

export const dialogsLoadSuccess = (dialogs: Array<IDialog>) => <const>({
	type: DIALOGS_LOAD_SUCCESS,
	payload: dialogs
});

export const dialogsGet = (offset: number) => <const>({
	type: DIALOGS_GET,
	offset
});

export const dialogsChangeCurrent = (newCurrent: number) => <const>({
	type: DIALOGS_CURRENT_CHANGE,
	payload: newCurrent
});
