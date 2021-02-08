import {all} from 'redux-saga/effects';

import usersSaga from './users/sagas';


function *createGroupSaga() {
	yield all([usersSaga()]);
}

export default createGroupSaga;
