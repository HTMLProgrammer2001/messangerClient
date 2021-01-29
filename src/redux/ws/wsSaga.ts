import {all} from 'redux-saga/effects';

import wsAPISaga from './wsAPI';
import wsDialogSaga from './dialog/rootSaga';
import wsUserSaga from './user/rootSaga';
import wsMessageSaga from './message/rootSaga';
import wsCallSaga from './call';


function *wsSaga() {
	yield all([
		wsAPISaga(),
		wsDialogSaga(),
		wsUserSaga(),
		wsMessageSaga(),
		wsCallSaga()
	]);
}

export default wsSaga;
