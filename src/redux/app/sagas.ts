import {takeEvery, put, all, race, take} from 'redux-saga/effects';

import {appInitializeError, appInitializeSuccess} from './actions';
import {APP_INITIALIZE_START} from './types';
import {meStart} from '../me/actions';
import {ME_RESET, ME_SET} from '../me/types';


function* appInitialize(): any{
	try{
		//start me loading
		yield put(meStart());

		//wait end
		yield race([take(ME_SET), take(ME_RESET)]);

		//set initialized
		yield put(appInitializeSuccess());
	}
	catch(e){
		//update error
		yield put(appInitializeError());
	}
}

function* watchAppSaga(){
	//watch
	yield all([
		takeEvery(APP_INITIALIZE_START, appInitialize)
	]);
}

export default watchAppSaga;
