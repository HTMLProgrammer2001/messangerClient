import {all} from 'redux-saga/effects';

import appSaga from './app/sagas';
import userSaga from './me/sagas';
import signInSaga from './signIn/sagas';
import logInSaga from './logIn/sagas';
import logoutSaga from './logout';
import chatSaga from './chat/chatSaga';
import me from './me/sagas';
import change from './change/sagas';
import editMe from './editMe/editMeSaga';
import search from './search/searchSaga';
import createPersonal from './createPersonal/sagas';
import clear from './clear/sagas';
import ban from './ban/sagas';
import sendMessage from './sendMessage/sagas';
import wsSaga from './ws/wsSaga';
import callSaga from './call/sagas';
import resendSaga from './resend/resendSaga';
import groupSaga from './group/groupSaga';


//create root saga that we can run
function* rootSaga(){
	yield all([
		appSaga(), userSaga(),
		signInSaga(), logInSaga(), logoutSaga(),
		chatSaga(), me(), resendSaga(),
		editMe(), change(), search(),
		createPersonal(), clear(), ban(),
		sendMessage(), wsSaga(), callSaga(), groupSaga()
	]);
}

export default rootSaga;
