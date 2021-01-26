import {all} from 'redux-saga/effects';

import wsAPISaga from './wsAPI';
import wsNewMessageSaga from './newMessage';
import wsNewDialogSaga from './newDialog';


function *wsSaga() {
	yield all([
		wsAPISaga(),
		wsNewMessageSaga(),
		wsNewDialogSaga()
	]);
}

export default wsSaga;
