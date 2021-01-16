import {all} from 'redux-saga/effects';

import dialogSaga from './dialog/sagas';
import messagesSaga from './messages/sagas';
import deleteSaga from './delete/sagas';


function *chatSaga() {
	yield all([
		dialogSaga(),
		messagesSaga(),
		deleteSaga()
	]);
}

export default chatSaga;
