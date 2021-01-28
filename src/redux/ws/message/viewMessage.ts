import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put, select, call} from 'redux-saga/effects';

import {IMessage} from '../../../interfaces/IMessage';
import {chatMessagesSuccess} from '../../chat/messages/slice';
import {selectMeState} from '../../me/slice';
import {selectMessages, messagesAddMany} from '../../messages';
import mapIdWith from '../../../utils/helpers/mapIdWith';
import ws from '../../../utils/ws/appWebsocket';


//actions
export const viewMessages = createAction<string[]>('WS/dialog/viewMessages');

//sagas
function *viewMessagesSaga({payload: messages}: ReturnType<typeof viewMessages>) {
	yield put(messagesAddMany(messages.reduce((acc, msg) => {
		acc[msg] = {readed: true};
		return acc;
	}, {})));
}

function *sendViewMessagesSaga({payload}: ReturnType<typeof chatMessagesSuccess>) {
	//get data from store
	const allMessages = yield select(selectMessages),
		{user} = yield select(selectMeState);

	//parse added messages
	const {data: messagesIds} = payload,
		messages = mapIdWith(messagesIds, allMessages) as IMessage[];

	//get un readed messages
	const ids = messages.reduce((acc, msg) => {
		return msg.readed || msg.author == user ? acc : [...acc, msg._id]
	}, []);

	if(!ids.length)
		return;

	//read it
	yield call(ws.viewMessages.bind(ws), ids);
}

function *watchViewMessagesSaga(){
	yield takeEvery(viewMessages.type, viewMessagesSaga);
	yield takeEvery(chatMessagesSuccess.type, sendViewMessagesSaga);
}

export default watchViewMessagesSaga;
