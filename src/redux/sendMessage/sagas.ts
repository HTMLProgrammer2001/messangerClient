import {takeEvery, delay, call, put, race, take} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';

import {sendMessageStart, sendMessageSuccess, sendMessageProgress, sendMessageCancel, ISendMessage} from './slice';
import sendMessageAPI from '../../utils/api/sendMessageAPI';
import {ISendMessageResponse} from '../../interfaces/Responses/chat/ISendMessageResponse';


function* sendMessageSaga({payload}: ReturnType<typeof sendMessageStart>) {
	const {token, cancel} = axios.CancelToken.source();

	while (true) {
		try {
			let {action, api} = yield race({
				action: take(action => {
					return action.type == sendMessageCancel.type && action.payload == payload._id
				}),
				api: call(sendMessageAPI.send, payload, token, function* (progress: number) {
					yield put(sendMessageProgress({message: payload._id, progress}));
				})
			});

			const resp = api as AxiosResponse<ISendMessageResponse>;

			console.log(resp);
			console.log(action);

			if (resp)
				yield put(sendMessageSuccess(payload._id));
			else {
				console.log('Cancel');
				return cancel();
			}

			break;
		} catch (e) {
			console.log(e);
			yield delay(1500);
		}
	}
}

export default function* sendMessageWatchSaga() {
	yield takeEvery(sendMessageStart.type, sendMessageSaga);
}
