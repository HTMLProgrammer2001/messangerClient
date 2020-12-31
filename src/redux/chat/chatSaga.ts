import {all} from 'redux-saga/effects';

import dialogSaga from './dialog/sagas';


function *chatSaga() {
	yield all([
		dialogSaga()
	]);
}

export default chatSaga;
