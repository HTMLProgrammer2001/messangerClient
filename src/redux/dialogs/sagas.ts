import {takeLatest, put, call} from 'redux-saga/effects';

import {DIALOGS_GET} from './types';
import {dialogsGet, dialogsLoadError, dialogsLoadStart, dialogsLoadSuccess} from './actions';
import messageAPI from '../../utils/api/messageAPI';


function* getDialogsSaga(action: ReturnType<typeof dialogsGet>){
	//set loading in true
	yield put(dialogsLoadStart());

	try{
		const dialogs: any = yield call(messageAPI.getDialogs, action.offset);
		yield put(dialogsLoadSuccess(dialogs));
	}
	catch(e){
		//set error
		yield put(dialogsLoadError(e.message));
	}
}

function* watchDialogsSaga(){
	//setup watchers
	yield takeLatest(DIALOGS_GET, getDialogsSaga);
}

export default watchDialogsSaga;
