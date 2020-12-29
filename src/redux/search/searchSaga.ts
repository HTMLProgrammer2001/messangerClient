import {all} from 'redux-saga/effects';

import stateSaga from './state/sagas';
import userSaga from './users/sagas';
import dialogsSaga from './dialogs/sagas';
import messagesSaga from './messages/sagas';


function *searchSaga() {
	yield all([
		stateSaga(),
		userSaga(),
		dialogsSaga(),
		messagesSaga()
	])
}

export default searchSaga;
