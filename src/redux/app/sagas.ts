import {takeEvery, put, all, race, take} from 'redux-saga/effects';

import {appStart, appSuccess, appError} from './slice';
import {meStart, meReset, meSet} from '../me/slice';


export function* initializeSaga(): any{
	try{
		//start me loading
		yield put(meStart());

		//wait end
		yield race([take(meSet.type), take(meReset.type)]);

		//set initialized
		yield put(appSuccess());
	}
	catch(e){
		//update error
		yield put(appError(e.message));
	}
}

function* watchAppSaga(){
	//watch
	yield all([
		takeEvery(appStart.type, initializeSaga)
	]);
}

export default watchAppSaga;
