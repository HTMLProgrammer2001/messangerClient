import {takeLatest, put, all} from 'redux-saga/effects';

import {searchSetCurrent} from '../search/slice';
import {CHAT_MORE} from './types';
import {chatLoadError, chatLoadStart, chatLoadSuccess} from './actions';


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
		takeLatest(searchSetCurrent.type, getChatSaga),
		takeLatest(CHAT_MORE, getChatSaga)
	]);
}

export default watchChatSaga;
