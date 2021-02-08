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


function* getUsers(name: string, offset = 1, mode: 'nick' | 'name') {
	try{
		const fn = mode == 'nick' ? searchAPI.getFriendsByNick : searchAPI.getFriendsByName,
			resp = yield call(fn, name, offset),
			hasMore = resp.data.data.length < resp.data.pageSize;

		yield put(usersAddMany(resp.data.data.reduce((prev, user) => {
			prev[user._id] = user;
			return prev;
		}, {})));

		yield put(createGroupUsersSuccess({
			users: resp.data.data.map(user => user._id),
			hasMore,
			offset: resp.data.page
		}));
	}
	catch (e) {
		yield put(createGroupUsersError(e.response?.data.message || e.message));
		toast.error(e.response?.data.message || e.message);
	}
}

function* createGroupUsersSaga() {
	const {text, offset} = yield select(selectGroupCreateUsersState);

	if(text.startsWith('@'))
		yield call(getUsers, text.slice(1), offset + 1, 'nick');
	else
		yield call(getUsers, text, offset + 1, 'name');
}

function* watchCreateUsersSaga() {
	yield all([
		takeLatest(createGroupUsersStart.type, createGroupUsersSaga),
		takeLatest(createGroupUsersMore.type, createGroupUsersSaga)
	]);
}

export default watchCreateUsersSaga;
