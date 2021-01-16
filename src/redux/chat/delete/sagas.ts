import {call, put, takeEvery} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {chatDeleteError, chatDeleteStart, chatDeleteSuccess} from './slice';
import {chatSelectedClear} from '../selected';
import {messagesRemove} from '../../messages';
import {chatMessagesRemove} from '../messages/slice';
import messageActionsAPI from '../../../utils/api/messageActionsAPI';


function *deleteMessagesSaga({payload}: ReturnType<typeof chatDeleteStart>) {
	try{
		//make api call
		yield call(messageActionsAPI.deleteMessages, payload.messages, payload.other);

		//change store
		yield put(chatDeleteSuccess());
		yield put(chatSelectedClear());

		for(let msg of payload.messages) {
			yield put(chatMessagesRemove(msg));
			yield put(messagesRemove(msg));
		}
	}
	catch (e) {
		//show error
		toast.error(e.response?.data.message || e.message);
		yield put(chatDeleteError());
	}
}

function *watchDeleteMessageSaga() {
	yield takeEvery(chatDeleteStart.type, deleteMessagesSaga);
}

export default watchDeleteMessageSaga;
