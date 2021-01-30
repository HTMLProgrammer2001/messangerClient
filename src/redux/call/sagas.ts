import {all, call, select, takeLatest, put, take, fork, delay, race} from 'redux-saga/effects';
import {channel} from 'redux-saga';
import {MediaConnection} from 'peerjs';

import {callConnected, callDisconnect, callStart, callSetStream} from './slice';
import {selectMeState} from '../me/slice';

import PeerService from '../../utils/peer';
import ws from '../../utils/ws/appWebsocket';


const callChannel = channel();

function *watchChannel() {
	while (true){
		const action = yield take(callChannel);
		yield put(action);
	}
}


function *callConnectedSaga({payload: withUserID}: ReturnType<typeof callConnected>) {
	yield call(ws.acceptCall.bind(ws), PeerService.getID(), withUserID);
}

function *callDisconnectedSaga({payload: withUserID}: ReturnType<typeof callConnected>) {
	yield call(() => PeerService.disconnect());
	yield call(ws.disconnectCall.bind(ws), withUserID);
}

function *sendCall(id: string){
	for(let i = 0; i < 90; i++) {
		yield call(ws.sendCall.bind(ws), id);
		yield delay(1000);
	}

	return true;
}

function *callStartSaga({payload: withUserID}: ReturnType<typeof callConnected>) {
	//get current user id
	const {user} = yield select(selectMeState);

	//open peer
	yield call(async () => {
		await PeerService.open(user);
		PeerService.addHandler('call', async (call: MediaConnection) => {
			console.log('Call');
			call.answer(await PeerService.getStream());

			call.on('stream', (userStream) => {
				callChannel.put(callSetStream(userStream));
			});

			call.on('close', () => {
				callChannel.put(callDisconnect(''));
			});
		});
	});

	//start race
	const {send, connected, disconnected} = yield race({
		send: call(sendCall, withUserID),
		connected: take(callConnected.type),
		disconnected: take(callDisconnect.type)
	});

	if(send)
		yield put(callDisconnect(withUserID));
}

function *callWatchSaga() {
	yield fork(watchChannel);

	yield all([
		takeLatest(callConnected.type, callConnectedSaga),
		takeLatest(callDisconnect.type, callDisconnectedSaga),
		takeLatest(callStart.type, callStartSaga)
	]);
}

export default callWatchSaga;
