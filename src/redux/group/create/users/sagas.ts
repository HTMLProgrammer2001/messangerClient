import {takeLatest, select, put, call, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {
	createGroupUsersStart,
	createGroupUsersError,
	createGroupUsersMore,
	createGroupUsersSuccess,
	selectGroupCreateUsersState
} from './slice';
import {usersAddMany} from '../../../users';

import searchAPI from '../../../../utils/api/searchAPI';


function* getUsersByName(name: string, offset = 1) {
	try{
		const resp = yield call(searchAPI.getFriendsByName, name, offset);

		yield put(usersAddMany(resp.data.data.reduce((prev, user) => {
			prev[user._id] = user;
			return prev;
		}, {})));
		yield put(createGroupUsersSuccess({users: resp.data.data.map(user => user._id), hasMore: true, offset}));
	}
	catch (e) {
		yield put(createGroupUsersError(e.response?.data.message || e.message));
		toast.error(e.response?.data.message || e.message);
	}
}

function* getUsersByNick(nick: string, offset = 1) {
	try{
		const resp = yield call(searchAPI.getFriendsByNick, nick, offset);

		yield put(usersAddMany(resp.data.data.reduce((prev, user) => {
			prev[user._id] = user;
			return prev;
		}, {})));
		yield put(createGroupUsersSuccess({users: resp.data.data.map(user => user._id), hasMore: true, offset}));
	}
	catch (e) {
		yield put(createGroupUsersError(e.response?.data.message || e.message));
		toast.error(e.response?.data.message || e.message);
	}
}

function* createGroupUsersSaga() {
	const {text, offset} = yield select(selectGroupCreateUsersState);

	if(text.startsWith('@'))
		yield call(getUsersByNick, text.slice(1), offset + 1);
	else
		yield call(getUsersByName, text, offset + 1);
}

function* watchCreateUsersSaga() {
	yield all([
		takeLatest(createGroupUsersStart.type, createGroupUsersSaga),
		takeLatest(createGroupUsersMore.type, createGroupUsersSaga)
	]);
}

export default watchCreateUsersSaga;
