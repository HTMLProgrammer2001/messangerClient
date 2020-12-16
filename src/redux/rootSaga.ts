import {all} from 'redux-saga/effects';

import appSaga from './app/sagas';
import userSaga from './me/sagas';
import dialogsSaga from './dialogs/sagas';
import signInSaga from './signIn/sagas';
import logInSaga from './logIn/sagas';
import chatSaga from './chat/sagas';
import newGroup from './newGroup/sagas';


//create root saga that we can run
function* rootSaga(){
	yield all([
		appSaga(),
		userSaga(),
		dialogsSaga(),
		signInSaga(),
		logInSaga(),
		chatSaga(),
		newGroup()
	]);
}

export default rootSaga;
