import {all, put, takeLeading, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IGetUserResponse} from '../../../interfaces/Responses/IGetUserResponse';
import {searchUserStart, searchUserError, searchUserSuccess} from './slice';
import {usersAdd} from '../../users';
import searchAPI from '../../../utils/api/searchAPI';


export function *searchUserSaga({payload}: ReturnType<typeof searchUserStart>) {
	try {
		const userResp: AxiosResponse<IGetUserResponse> = yield call(searchAPI.getUser, payload);

		//set user
		yield put(searchUserSuccess(userResp.data.user?._id));
		yield put(usersAdd(userResp.data.user));
	}
	catch (e) {
		//show error
		if(e.response?.status != 404)
			toast.error('Error in user loading occured');

		yield put(searchUserError());
	}
}

function *searchUserWatchSaga() {
	yield all([
		takeLeading(searchUserStart.type, searchUserSaga)
	]);
}

export default searchUserWatchSaga;
