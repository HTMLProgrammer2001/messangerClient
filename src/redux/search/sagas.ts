import {all, put, takeEvery, select, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {IPaginateResponse} from '../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../interfaces/IDialog';
import {IGetUserResponse} from '../../interfaces/Responses/IGetUserResponse';
import {SearchTypes} from '../../constants/SearchTypes';

import getSearchType from '../../utils/helpers/getSearchType';
import {searchSetText, searchStart, searchSuccess, searchError, selectSearchText, searchSetUser, searchAddDialogs} from './slice';
import {usersAdd} from '../users';
import {dialogsAddMany} from '../dialogs';
import searchAPI from '../../utils/api/searchAPI';


type IDialogsResponse = IPaginateResponse<IDialog>

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
		const [userResp, dialogsResp]: [IGetUserResponse, IDialogsResponse] = yield all([
			searchAPI.getDialogsByNick(nick), searchAPI.getUser(nick)
		]);

		//set user
		yield put(usersAdd(userResp.user));
		yield put(searchSetUser(userResp.user._id));

		//set dialogs
		yield put(dialogsAddMany(dialogsResp.data));
		yield put(searchAddDialogs(dialogsResp?.data?.map(d => d._id)));

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
	return null;
}

function *searchWatchSaga(){
	yield all([
		takeEvery(searchStart.type, searchSaga)
	])
}

export default searchWatchSaga;
