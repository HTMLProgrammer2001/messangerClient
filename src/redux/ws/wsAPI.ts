import {createAction} from '@reduxjs/toolkit';
import {put, takeLeading, all, take, fork} from 'redux-saga/effects';
import {channel} from 'redux-saga';

import ws from '../../utils/ws';
import {IMessage} from '../../interfaces/IMessage';

import {wsNewMessage} from './newMessage';


//create actions
export const wsConnect = createAction('WS/connect');
export const wsDisconnect = createAction('WS/disconnect');

//create channel
const wsChannel = channel();

function *listenChannel() {
	console.log('Listen');

	while (true){
		const action = yield take(wsChannel);
		yield put(action);
	}
}

function *connectSaga() {
	ws.connect(() => {
		console.log('Connected');

		//add handlers
		ws.addHandler('newMessage', (msg: IMessage) => wsChannel.put(wsNewMessage(msg)));
	});
}

function *disconnectSaga() {
	ws.disconnect();
}

export default function *watchWSSaga() {
	yield fork(listenChannel);

	yield all([
		takeLeading(wsConnect.type, connectSaga),
		takeLeading(wsDisconnect.type, disconnectSaga)
	]);
}
