import {all} from 'redux-saga/effects';

import appSaga from './app/sagas';
import userSaga from './me/sagas';
import signInSaga from './signIn/sagas';
import logInSaga from './logIn/sagas';
import logoutSaga from './logout';
import chatSaga from './chat/chatSaga';
import newGroup from './newGroup/sagas';
import me from './me/sagas';
import change from './change/sagas';
import editMe from './editMe/editMeSaga';
import search from './search/searchSaga';
import createPersonal from './createPersonal/sagas';
import clear from './clear/sagas';


//create root saga that we can run
function* rootSaga(){
	yield all([
		appSaga(), userSaga(),
		signInSaga(), logInSaga(), logoutSaga(),
		chatSaga(), newGroup(), me(),
		editMe(), change(), search(),
		createPersonal(), clear()
	]);
}

export default rootSaga;
