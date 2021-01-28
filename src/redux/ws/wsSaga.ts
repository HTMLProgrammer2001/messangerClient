import {all} from 'redux-saga/effects';

import wsAPISaga from './wsAPI';
import wsDialogSaga from './dialog/rootSaga';
import wsUserSaga from './user/rootSaga';
import wsMessageSaga from './message/rootSaga';


function *wsSaga() {
	yield all([
		wsAPISaga(),
		wsDialogSaga(),
		wsUserSaga(),
		wsMessageSaga()
	]);
}

export default wsSaga;
