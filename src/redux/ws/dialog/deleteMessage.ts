import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put} from 'redux-saga/effects';

import {messagesRemove} from '../../messages';
import {chatMessagesRemove} from '../../chat/messages/slice';


//actions
export const deleteMessage = createAction<string>('WS/dialog/deleteMessage');

//sagas
function *deleteMessageSaga({payload: msg}: ReturnType<typeof deleteMessage>) {
	yield put(chatMessagesRemove(msg));
	yield put(messagesRemove(msg));
}

function *watchDeleteMessageSaga(){
	yield takeEvery(deleteMessage.type, deleteMessageSaga);
}

export default watchDeleteMessageSaga;
