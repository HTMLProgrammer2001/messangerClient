import {takeEvery, put, select} from 'redux-saga/effects';
import {getFormValues, startSubmit, stopSubmit} from 'redux-form';

import {GROUP_CREATE} from './types';
import {IGroupNameFormData} from '../../components/PopUps/NewGroupNamePopup/NameForm';
import {selectNewGroupStateUsers} from './selectors';


function* newGroup(){
	yield put(startSubmit('groupName'));

	try{
		//get form values from store
		const selector = getFormValues('groupName');
		const formValues = select(selector);
		const formValuesT = (<any>formValues) as IGroupNameFormData;

		const users = select(selectNewGroupStateUsers);

		//make api request
		//yield call(authAPI.logIn, formValuesT);
		yield put(stopSubmit('groupName'));
	}
	catch(e){
		//update error
		yield put(stopSubmit('groupName', {
			_error: e.response?.data.message || e.message
		}));
	}
}

function* watchNewGroupSaga(){
	//watch
	yield takeEvery(GROUP_CREATE, newGroup);
}

export default watchNewGroupSaga;
