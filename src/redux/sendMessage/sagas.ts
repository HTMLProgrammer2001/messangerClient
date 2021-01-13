import {takeEvery, delay, call, put, fork, take, cancel, cancelled, race} from 'redux-saga/effects';
import axios, {AxiosResponse, CancelToken} from 'axios';

import {ISendMessageResponse} from '../../interfaces/Responses/chat/ISendMessageResponse';
import {sendMessageStart, sendMessageSuccess, sendMessageProgress, sendMessageCancel, ISendMessage} from './slice';
import {messagesAdd} from '../messages';
import {dialogsAdd} from '../dialogs';
import sendMessageAPI from '../../utils/api/sendMessageAPI';


function* sendMessageApi(data: ISendMessage, token: CancelToken){
	let i = 0;

	while (true) {
		try {
			//make api call
			const resp: AxiosResponse<ISendMessageResponse> = yield call(sendMessageAPI.send,
				data, token, function* (progress: number) {
					yield put(sendMessageProgress({message: data._id, progress}));
				});

			//update state
			yield put(sendMessageSuccess(data._id));
			yield put(messagesAdd(resp.data.newMessage));

			//update dialog last message
			yield put(dialogsAdd({_id: data.dialog, lastMessage: resp.data.newMessage._id} as any));

			//exit loop
			break;
		} catch (e) {
			//exit on task cancel
			if(yield cancelled())
				return;

			//increase interval
			if(i < 60)
				i++;

			yield delay(1000 * i);
		}
	}
}

function* sendMessageSaga({payload}: ReturnType<typeof sendMessageStart>) {
	const source = axios.CancelToken.source(),
		//start send messages
		task = yield fork(sendMessageApi, payload, source.token);

	//start race between success sending and cancellation
	const {api, cancelMessage} = yield race({
		api: take(action => action.type == sendMessageSuccess.type && action.payload == payload._id),
		cancelMessage: take(action => action.type == sendMessageCancel.type && action.payload == payload._id)
	});

	if(cancelMessage){
		//stop api calls
		yield cancel(task);
		source.cancel();
	}
}

export default function* sendMessageWatchSaga() {
	yield takeEvery(sendMessageStart.type, sendMessageSaga);
}
