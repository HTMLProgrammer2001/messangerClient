import {createAction} from '@reduxjs/toolkit';
import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import {IUser} from '../../interfaces/IUser';
import store from '../';
import {callConnected, callDisconnect, callReceive, selectCallState, callSetStream} from '../call/slice';
import {selectMeState} from '../me/slice';
import {usersAdd} from '../users';
import PeerService from '../../utils/peer';


//actions
export const wsCallAccept = createAction<string>('WS/call/accept');
export const wsCallReceive = createAction<IUser>('WS/call/receive');
export const wsCallDisconnect = createAction<string>('WS/call/disconnect');

//sagas
function *callAcceptSaga({payload: peerID}: ReturnType<typeof wsCallAccept>) {
	yield put(callConnected());
	yield call(async () => {
		const call = await PeerService.call(peerID);

		if(call){
			call.on('stream', userStream => {
				store.dispatch(callSetStream(userStream));
			});

			call.on('close', () => {
				store.dispatch(callDisconnect());
			});
		}
	});
}

function *receiveSaga({payload}: ReturnType<typeof wsCallReceive>) {
	yield put(usersAdd(payload));
	yield put(callReceive(payload._id));

	const {user} = yield select(selectMeState);
	yield call(() => PeerService.open(user));
}

function *disconnectSaga({payload}: ReturnType<typeof wsCallReceive>) {
	const {callWith} = yield select(selectCallState);

	if(callWith == payload) {
		yield call(() => PeerService.disconnect());
		yield put(callDisconnect());
	}
}

function *callWatchSaga() {
	yield all([
		takeEvery(wsCallAccept.type, callAcceptSaga),
		takeEvery(wsCallReceive.type, receiveSaga),
		takeEvery(wsCallDisconnect.type, disconnectSaga)
	]);
}

export default callWatchSaga;
