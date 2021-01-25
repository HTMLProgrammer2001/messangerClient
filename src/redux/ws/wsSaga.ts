import {all} from 'redux-saga/effects';

import wsAPISaga from './wsAPI';
import wsNewMessageSaga from './newMessage';


function *wsSaga() {
	yield all([
		wsAPISaga(),
		wsNewMessageSaga()
	]);
}

export default wsSaga;
