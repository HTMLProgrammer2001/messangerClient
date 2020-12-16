import {takeLatest, put, all} from 'redux-saga/effects';

import {DIALOGS_CURRENT_CHANGE} from '../dialogs/types';
import {CHAT_MORE} from './types';
import {chatLoadError, chatLoadStart, chatLoadSuccess} from './actions';
import messageAPI from '../../utils/api/messageAPI';


function* getChatSaga(){
	//set loading in true
	yield put(chatLoadStart());

	try{
		//const dialogs = yield messageAPI.getDialogs(action.offset);
		yield put(chatLoadSuccess([]));
	}
	catch(e){
		//set error
		yield put(chatLoadError(e.message));
	}
}

function* watchChatSaga(){
	//setup watchers
	yield all([
		takeLatest(DIALOGS_CURRENT_CHANGE, getChatSaga),
		takeLatest(CHAT_MORE, getChatSaga)
	]);
}

export default watchChatSaga;
