import {createAction} from '@reduxjs/toolkit';
import {put, takeLeading, all, take, fork} from 'redux-saga/effects';
import {channel} from 'redux-saga';

import ws from '../../utils/ws';
import {IMessage} from '../../interfaces/IMessage';
import {IDialog} from '../../interfaces/IDialog';

import {wsNewMessage} from './newMessage';
import {wsNewDialog} from './newDialog';
import {wsToggle} from './dialog/banUser';
import {updateMessage} from './dialog/updateMessage';
import {deleteMessage} from './dialog/deleteMessage';
import {wsUserOnline} from './user/online';
import {wsUserOffline} from './user/offline';


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
		ws.addHandler('newDialog', (dlg: IDialog) => wsChannel.put(wsNewDialog(dlg)));
		ws.addHandler('banUser', (user: string) => wsChannel.put(wsToggle(user)));
		ws.addHandler('updateMessage', (msg: IMessage) => wsChannel.put(updateMessage(msg)));
		ws.addHandler('deleteMessage', (id: string) => wsChannel.put(deleteMessage(id)));
		ws.addHandler('online', (id: string) => wsChannel.put(wsUserOnline(id)));
		ws.addHandler('offline', (id: string) => wsChannel.put(wsUserOffline(id)));
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
