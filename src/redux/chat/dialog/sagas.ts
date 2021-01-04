import {takeLatest, put, all, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {IGetDialogResponse} from '../../../interfaces/Responses/chat/IGetDialogResponse';
import {IGetUserResponse} from '../../../interfaces/Responses/IGetUserResponse';

import {searchSetCurrent} from '../../search/state/slice';
import {chatDialogStart, chatDialogError, chatSetDialog, chatSetUser} from './slice';
import {searchUserSuccess} from '../../search/users/slice';
import {searchSetText} from '../../search/state/slice';
import {dialogsAdd} from '../../dialogs';
import {usersAdd} from '../../users';
import chatAPI from '../../../utils/api/chatAPI';
import {SearchTypes} from '../../../constants/SearchTypes';


function *getDialog(nick: string) {
	try {
		const respDialog: AxiosResponse<IGetDialogResponse> = yield call(chatAPI.getDialogByNick, nick);

		//set dialogs to store
		yield put(dialogsAdd(respDialog.data.dialog));
		yield put(chatSetDialog({nick, id: respDialog.data.dialog._id}));

		return true;
	}
	catch(e){
		return true;
	}
}

function *getUser(nick: string) {
	try {
		const respUser: AxiosResponse<IGetUserResponse> = yield call(chatAPI.getUserByNick, nick);

		//set user to store
		yield put(usersAdd(respUser.data.user));
		yield put(searchUserSuccess(respUser.data.user._id));
		yield put(chatSetUser({nick, id: respUser.data.user._id}));
		yield put(searchSetText({type: SearchTypes.NICK, text: `@${nick}`}));

		return true;
	}
	catch(e){
		return true;
	}
}

function* getChatSaga({payload}: ReturnType<typeof searchSetCurrent>){
	//set loading in true
	yield put(chatDialogStart());

	try{
		const res: boolean[] = yield all([call(getDialog, payload), call(getUser, payload)]);

		if(!res.every(item => item))
			yield put(chatDialogError());
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
