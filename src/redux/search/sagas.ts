import {all, put, takeEvery, select, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IPaginateResponse} from '../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../interfaces/IDialog';
import {IMessage} from '../../interfaces/IMessage';
import {IGetUserResponse} from '../../interfaces/Responses/IGetUserResponse';
import {SearchTypes} from '../../constants/SearchTypes';

import getSearchType from '../../utils/helpers/getSearchType';
import {
	searchSetText, searchStart, searchSuccess, searchError, 
	selectSearchText, searchSetUser, searchAddDialogs, searchAddMessages
} from './slice';
import {usersAdd} from '../users';
import {dialogsAddMany} from '../dialogs';
import searchAPI from '../../utils/api/searchAPI';


type IDialogsResponse = IPaginateResponse<IDialog>
type IMessagesResponse = IPaginateResponse<IMessage>

function *searchSaga({payload: text}: ReturnType<typeof searchStart>){
	//parse type from search text
	const type = getSearchType(text);
	yield put(searchSetText({text, type}));

	//start loading
	yield call(type == SearchTypes.NICK ? searchNick : searchText);
}

function *searchNick() {
	let text = yield select(selectSearchText),
		nick = text.slice(1);

	try{
		//make api calls
		let [dialogsResp, userResp] = yield all([
			call(searchAPI.getDialogsByNick, nick), call(searchAPI.getUser, nick)
		]);

		userResp = userResp as AxiosResponse<IGetUserResponse>;
		dialogsResp = dialogsResp as AxiosResponse<IDialogsResponse>;

		//set user
		yield put(searchSetUser(userResp.data.user?._id));
		yield put(usersAdd(userResp.data.user));

		//set dialogs
		yield put(searchAddDialogs(dialogsResp.data.data.map(d => d._id)));
		yield put(dialogsAddMany(dialogsResp.data.data));

		//set success
		yield put(searchSuccess());
	}
	catch (e) {
		//show error
		toast.error(e.response?.message || e.message);
		yield put(searchError());
	}
}

function *searchText() {
	let text = yield select(selectSearchText);

	//make api calls
	let [dialogsResp, messagesResp] = yield all([
		call(searchAPI.getDialogsByName, text), call(searchAPI.getMessagesByText, text)
	]);

	messagesResp = messagesResp as AxiosResponse<IGetUserResponse>;
	dialogsResp = dialogsResp as AxiosResponse<IDialogsResponse>;

	//set dialogs
	yield put(searchAddDialogs(dialogsResp.data.data.map(d => d._id)));
	yield put(dialogsAddMany(dialogsResp.data.data));

	//set messages
	yield put(searchAddMessages(messagesResp.data.map(message => message._id)));
	//yield put(usersAdd(userResp.data.user));

	//set success
	yield put(searchSuccess());
}

function *searchWatchSaga(){
	yield all([
		takeEvery(searchStart.type, searchSaga)
	])
}

export default searchWatchSaga;
