import {takeEvery, delay, call, put, fork, take, cancel, cancelled, race} from 'redux-saga/effects';
import {channel} from 'redux-saga';
import axios, {AxiosResponse, CancelToken} from 'axios';
import {toast} from 'react-toastify';

import {ISendMessageResponse} from '../../../interfaces/Responses/chat/ISendMessageResponse';
import {chatEditStart, chatEditSuccess} from './slice';
import {messagesAdd} from '../../messages';
import {chatSelectedClear} from '../selected';

import {
	sendMessageSuccess, sendMessageProgress,
	sendMessageCancel, sendMessageAdd,ISendMessage
} from '../../sendMessage/slice';

import messageActionsAPI from '../../../utils/api/messageActionsAPI';


function *progressWatch(prgChannel: any){
	while(true){
		const action = yield take(prgChannel);
		yield put(action);
	}
}

function* editMessageApi(id: string, data: ISendMessage, token: CancelToken){
	let i = 0;

	//create progress channel and watch it
	const progressChannel = channel();
	yield fork(progressWatch, progressChannel);

	while (true) {
		try {

			//make api call
			const resp: AxiosResponse<ISendMessageResponse> = yield call(messageActionsAPI.editMessage,
				id, data, token, (progress: number) => {
					progressChannel.put(sendMessageProgress({message: data._id, progress}));
				});

			//update state
			yield put(sendMessageSuccess(data._id));
			yield put(messagesAdd({
				...resp.data.newMessage,
				author: resp.data.newMessage.author._id
			} as any));
			yield put(chatEditSuccess());
			yield put(chatSelectedClear());

			//exit loop
			break;
		} catch (e) {
			//exit on task cancel
			if(yield cancelled())
				return;

			if(e.toJSON().message != 'Network Error') {
				toast.error(e.response?.data.message || e.message);
				yield put(sendMessageCancel(data._id));

				return;
			}

			//increase interval
			if(i < 60)
				i++;

			yield delay(1000 * i);
		}
	}
}

function* editMessageSaga({payload}: ReturnType<typeof chatEditStart>) {
	const source = axios.CancelToken.source(),
		//start edit messages
		task = yield fork(editMessageApi, payload.id, payload.message, source.token);

	//add send message
	yield put(sendMessageAdd(payload.message));

	//start race between success sending and cancellation
	const {api, cancelMessage} = yield race({
		api: take(action => action.type == sendMessageSuccess.type && action.payload == payload.message._id),
		cancelMessage: take(action => action.type == sendMessageCancel.type && action.payload == payload.message._id)
	});

	if(cancelMessage){
		//stop api calls
		yield cancel(task);
		source.cancel();
	}
}

export default function* editMessageWatchSaga() {
	yield takeEvery(chatEditStart.type, editMessageSaga);
}
