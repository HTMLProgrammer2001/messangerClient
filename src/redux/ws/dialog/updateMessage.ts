import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put} from 'redux-saga/effects';

import {IMessage} from '../../../interfaces/IMessage';
import {messagesAdd} from '../../messages';


//actions
export const updateMessage = createAction<IMessage>('WS/dialog/updateMessage');

//sagas
function *updateMessageSaga({payload: msg}: ReturnType<typeof updateMessage>) {
	yield put(messagesAdd(msg));
}

function *watchUpdateMessageSaga(){
	yield takeEvery(updateMessage.type, updateMessageSaga);
}

export default watchUpdateMessageSaga;
