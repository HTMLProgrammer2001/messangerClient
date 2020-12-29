import {all, put, takeEvery, select, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {SearchTypes} from '../../../constants/SearchTypes';
import getSearchType from '../../../utils/helpers/getSearchType';
import {searchSetText, searchStart, searchSuccess, searchError, selectSearchText} from './slice';

import {searchDialogsNickSaga, searchDialogsNameSaga} from '../dialogs/sagas';
import {searchDialogsStartNick, searchDialogsStartName, searchDialogsClear} from '../dialogs/slice';
import {searchUserSaga} from '../users/sagas';
import {searchUserStart, searchUserClear} from '../users/slice';
import {searchMessagesSaga} from '../messages/sagas';
import {searchMessagesStart, searchMessagesClear} from '../messages/slice';


function *searchSaga({payload: text}: ReturnType<typeof searchStart>){
	//parse type from search text
	const type = getSearchType(text);
	yield put(searchSetText({text, type}));

	//clear state
	yield put(searchUserClear());
	yield put(searchDialogsClear());
	yield put(searchMessagesClear());

	//start loading
	yield call(type == SearchTypes.NICK ? searchNick : searchText);
}

function *searchNick() {
	let text = yield select(selectSearchText),
		nick = text.slice(1);

	try{
		//make calls
		yield all([
			call(searchDialogsNickSaga, searchDialogsStartNick({nick, offset: 1})),
			call(searchUserSaga, searchUserStart(nick))
		]);

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

	try{
		//make api calls
		yield all([
			call(searchDialogsNameSaga, searchDialogsStartName({offset: 1, name: text})),
			call(searchMessagesSaga, searchMessagesStart({text, offset: 1}))
		]);

		//set success
		yield put(searchSuccess());
	}
	catch (e) {
		//show error
		toast.error(e.response?.message || e.message);
		yield put(searchError());
	}
}

function *searchWatchSaga(){
	yield all([
		takeEvery(searchStart.type, searchSaga)
	])
}

export default searchWatchSaga;
