import {all} from 'redux-saga/effects';

import createSaga from './create/createGroupSaga'


function *groupSaga(){
	yield all([
		createSaga()
	]);
}

export default groupSaga;
