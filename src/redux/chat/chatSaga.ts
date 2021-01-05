import {all} from 'redux-saga/effects';

import dialogSaga from './dialog/sagas';
import messagesSaga from './messages/sagas';


function *chatSaga() {
	yield all([
		dialogSaga(),
		messagesSaga()
	]);
}

export default chatSaga;
