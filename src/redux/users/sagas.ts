import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {getFormValues} from 'redux-form';

import {usersAdd, usersStart, usersError, usersLoad} from './actions';
import searchAPI from '../../utils/api/searchAPI';
import {USERS_LOAD} from './types';
import {IGetUsersResponse} from '../../interfaces/Responses/IGetUsersResponse';


function* loadUsers(action: ReturnType<typeof usersLoad>) {
	yield put(usersStart());

	try{
		//get form values
		const selector = getFormValues('newGroupForm');
		const formValues = select(selector);
		const formValuesT = (<any>formValues) as any;

		//make API request
		const resp: IGetUsersResponse = yield call(searchAPI.search, formValuesT.text, action.offset);

		yield usersAdd(resp.data);
	}
	catch(e){
		//update error
		yield usersError(e.response?.data.message || e.message);
	}
}

function* usersWatchSaga() {
	yield all([
		takeEvery(USERS_LOAD, loadUsers)
	])
}

export default usersWatchSaga;
