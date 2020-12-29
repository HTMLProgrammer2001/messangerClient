import {all, put, takeLeading, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IMessage} from '../../../interfaces/IMessage';
import {searchMessagesStart, searchMessagesError, searchMessagesSuccess} from './slice';
import {messagesAddMany} from '../../messages';
import searchAPI from '../../../utils/api/searchAPI';


type IMessagesResponse = IPaginateResponse<IMessage>

export function *searchMessagesSaga({payload: {text, offset = 1}}: ReturnType<typeof searchMessagesStart>) {
	try {
		const messageResp: AxiosResponse<IMessagesResponse> = yield call(searchAPI.getMessagesByText, text, offset);

		//set messages
		const messagesData = {
			messages: messageResp.data.data.map(msg => msg._id),
			total: messageResp.data.total,
			offset: messageResp.data.page,
			totalPages: messageResp.data.totalPages
		};

		yield put(messagesAddMany(messageResp.data.data));
		yield put(searchMessagesSuccess(messagesData));
	}
	catch (e) {
		//show error
		toast.error('Error in messages loading occured');
		yield put(searchMessagesError());
	}
}

function *searchMessagesWatchSaga() {
	yield all([
		takeLeading(searchMessagesStart.type, searchMessagesSaga)
	]);
}

export default searchMessagesWatchSaga;
