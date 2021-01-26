import {all} from 'redux-saga/effects';

import wsAPISaga from './wsAPI';
import wsNewMessageSaga from './newMessage';
import wsNewDialogSaga from './newDialog';
import wsDialogSaga from './dialog/rootSaga';


function *wsSaga() {
	yield all([
		wsAPISaga(),
		wsNewMessageSaga(),
		wsNewDialogSaga(),
		wsDialogSaga()
	]);
}

export default wsSaga;
