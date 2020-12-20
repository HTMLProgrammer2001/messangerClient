import {all} from 'redux-saga/effects';

import appSaga from './app/sagas';
import userSaga from './me/sagas';
import dialogsSaga from './dialogs/sagas';
import signInSaga from './signIn/sagas';
import logInSaga from './logIn/sagas';
import logoutSaga from './logout';
import chatSaga from './chat/sagas';
import newGroup from './newGroup/sagas';
import me from './me/sagas';
import editMe from './editMe/editMeSaga';
import change from './change/sagas';


//create root saga that we can run
function* rootSaga(){
	yield all([
		appSaga(),
		userSaga(),
		dialogsSaga(),
		signInSaga(),
		logInSaga(),
		logoutSaga(),
		chatSaga(),
		newGroup(),
		me(),
		editMe(),
		change()
	]);
}

export default rootSaga;
