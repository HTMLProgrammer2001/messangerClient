import {takeLatest, put, all, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {normalize, schema} from 'normalizr';

import {IGetDialogResponse} from '../../../interfaces/Responses/chat/IGetDialogResponse';
import {IGetUserResponse} from '../../../interfaces/Responses/IGetUserResponse';
import {IDialog} from '../../../interfaces/IDialog';
import {IUser} from '../../../interfaces/IUser';
import {IMessage} from '../../../interfaces/IMessage';

import {searchSetCurrent} from '../../search/state/slice';
import {chatDialogStart, chatDialogError, chatSetDialog, chatSetUser, chatSuccess, chatClear} from './slice';
import {chatMessagesStart, chatMessagesClear} from '../messages/slice';
import {dialogsAddMany} from '../../dialogs';
import {usersAdd, usersAddMany} from '../../users';
import {messagesAddMany} from '../../messages';
import {chatSelectedClear} from '../selected';
import {chatEditClear} from '../edit/slice';
import chatAPI from '../../../utils/api/chatAPI';


const normalizeDialog = (data: IDialog) => {
	const author = new schema.Entity('users', {}, {idAttribute: '_id'}),
		message = new schema.Entity('messages', {author}, {idAttribute: '_id'}),
		dialog = new schema.Entity('dialogs', {lastMessage: message});

	return normalize<any, {
		users: Record<string, IUser>,
		messages: Record<string, IMessage>,
		dialogs: Record<string, IDialog>,
	}>(data, dialog);
};

function *getDialog(nick: string) {
	try {
		const respDialog: AxiosResponse<IGetDialogResponse> = yield call(chatAPI.getDialogByNick, nick);
		const normalizedResp = normalizeDialog(respDialog.data.dialog);

		//set dialogs to store
		yield put(dialogsAddMany(normalizedResp.entities.dialogs));
		yield put(usersAddMany(normalizedResp.entities.users));
		yield put(messagesAddMany(normalizedResp.entities.messages));
		yield put(chatSetDialog({nick, id: respDialog.data.dialog._id}));

		return false;
	}
	catch(e){
		if(e.response?.status == 404)
			return 404;

		return true;
	}
}

function *getUser(nick: string) {
	try {
		const respUser: AxiosResponse<IGetUserResponse> = yield call(chatAPI.getUserByNick, nick);

		//set user to store
		yield put(usersAdd(respUser.data.user));
		yield put(chatSetUser({nick, id: respUser.data.user._id}));

		return false;
	}
	catch(e){
		if(e.response?.status == 404)
			return 404;

		return true;
	}
}

function* getChatSaga({payload}: ReturnType<typeof searchSetCurrent>){
	if(!payload) {
		yield put(chatClear());
		return;
	}

	const dlgID = payload.split('_')[0];

	//reset old chat data
	yield put(chatEditClear());
	yield put(chatSelectedClear());

	//set loading in true
	yield put(chatDialogStart());

	try{
		//clear messages
		yield put(chatMessagesClear());

		const res: number[] = yield all([call(getDialog, dlgID), call(getUser, dlgID)]);

		//set error
		if(res.every(item => item == 404) || (res[0] && res[1]))
			yield put(chatDialogError());

		//start message loading
		yield put(chatMessagesStart());

		//success
		yield put(chatSuccess());
	}
	catch(e){
		console.log(e.message);
	}
}

function* watchChatSaga(){
	//setup watchers
	yield all([
		takeLatest(searchSetCurrent.type, getChatSaga)
	]);
}

export default watchChatSaga;
