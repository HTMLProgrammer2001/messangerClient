import {createAction} from '@reduxjs/toolkit';
import {put, takeLeading, all, take, fork} from 'redux-saga/effects';
import {channel} from 'redux-saga';

import ws from '../../utils/ws/appWebsocket';
import {IMessage} from '../../interfaces/IMessage';
import {IDialog} from '../../interfaces/IDialog';

import {wsNewMessage} from './message/newMessage';
import {wsNewDialog} from './dialog/newDialog';
import {wsToggle} from './user/banUser';
import {updateMessage} from './message/updateMessage';
import {deleteMessage} from './message/deleteMessage';
import {wsUserOnline} from './user/online';
import {wsUserOffline} from './user/offline';
import {wsDialogSetStatus} from './dialog/status';
import {viewMessages} from './message/viewMessage';
import {wsCallAccept, wsCallDisconnect, wsCallReceive} from './call';
import {IUser} from '../../interfaces/IUser';


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
		ws.addHandler('setStatus', (data: any) => wsChannel.put(wsDialogSetStatus(data)));
		ws.addHandler('viewMessages', (ids: string[]) => wsChannel.put(viewMessages(ids)));
		ws.addHandler('acceptCall', (peerID: string) => wsChannel.put(wsCallAccept(peerID)));
		ws.addHandler('receiveCall', (from: IUser) => wsChannel.put(wsCallReceive(from)));
		ws.addHandler('disconnectCall', (withID: string) => wsChannel.put(wsCallDisconnect(withID)));
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
