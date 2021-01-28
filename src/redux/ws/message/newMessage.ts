import {takeEvery, put, select, call} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';

import {IMessage} from '../../../interfaces/IMessage';
import {messagesAdd} from '../../messages';
import {dialogsAdd, dialogAddCount} from '../../dialogs';
import {usersAdd} from '../../users';
import {selectChatDialogState} from '../../chat/dialog/slice';
import {chatMessagesAdd} from '../../chat/messages/slice';
import ws from '../../../utils/ws/appWebsocket';


//create actions
export const wsNewMessage = createAction<IMessage>('WS/newMessage');

//create sagas
function *newMessageSaga({payload: message}: ReturnType<typeof wsNewMessage>) {
	yield put(usersAdd(message.author));
	yield put(dialogsAdd(message.dialog));

	//@ts-ignore
	yield put(messagesAdd({...message, author: message.author._id, dialog: message.dialog._id}));

	const {dialog: curDialog} = yield select(selectChatDialogState);

	if(curDialog == message.dialog._id) {
		yield put(chatMessagesAdd({message: message._id, first: true}));
		yield call(ws.viewMessages.bind(ws), [message._id]);
	}
	else
		yield put(dialogAddCount({dialog: message.dialog._id, count: 1}));
}

function *watchNewMessageSaga() {
	yield takeEvery(wsNewMessage.type, newMessageSaga);
}

export default watchNewMessageSaga;
