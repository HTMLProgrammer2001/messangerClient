import {takeEvery, delay, call, put, fork, take, cancel, cancelled, race, select} from 'redux-saga/effects';
import {channel} from 'redux-saga';
import axios, {AxiosResponse, CancelToken} from 'axios';

import {ISendMessageResponse} from '../../interfaces/Responses/chat/ISendMessageResponse';
import {sendMessageStart, sendMessageSuccess, sendMessageProgress, sendMessageCancel, ISendMessage} from './slice';
import {messagesAdd} from '../messages';
import {dialogsAdd} from '../dialogs';
import {chatMessagesAdd} from '../chat/messages/slice';
import messageActionsAPI from '../../utils/api/messageActionsAPI';
import {selectChatDialogState} from '../chat/dialog/slice';


function *progressWatch(prgChannel: any){
	while(true){
		const action = yield take(prgChannel);
		yield put(action);
	}
}

function* sendMessageApi(data: ISendMessage, token: CancelToken){
	let i = 0;

	//create progress channel and watch it
	const progressChannel = channel();
	yield fork(progressWatch, progressChannel);

	while (true) {
		try {

			//make api call
			const resp: AxiosResponse<ISendMessageResponse> = yield call(messageActionsAPI.send,
				data, token, (progress: number) => {
					progressChannel.put(sendMessageProgress({message: data._id, progress}));
				});

			//get current dialog
			const {dialog} = yield select(selectChatDialogState);

			//update state
			yield put(sendMessageSuccess(data._id));
			yield put(messagesAdd({
				...resp.data.newMessage,
				author: resp.data.newMessage.author._id
			} as any));

			//update dialog last message
			yield put(dialogsAdd({_id: data.dialog._id, lastMessage: resp.data.newMessage._id} as any));

			if(dialog == data.dialog._id)
				yield put(chatMessagesAdd({
					message: resp.data.newMessage._id,
					first: true
				}));

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
