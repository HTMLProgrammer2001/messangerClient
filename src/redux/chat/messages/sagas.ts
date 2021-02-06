import {all, put, takeEvery, select, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IMessage} from '../../../interfaces/IMessage';

import {chatMessagesStart, chatMessagesError, chatMessagesSuccess, selectChatMessagesState, chatMessagesClear} from './slice';
import {selectChatDialogState} from '../dialog/slice';
import {messagesAddMany} from '../../messages';
import {usersAddMany} from '../../users';
import {dialogsAddMany} from '../../dialogs';
import normalizeMessages from '../../../utils/normalizers/messagesNormalize';
import chatAPI from '../../../utils/api/chatAPI';


type IGetMessagesResp = AxiosResponse<IPaginateResponse<IMessage>>


function *getMessagesForChatSaga() {
	try{
		//get data from redux
		const {offset} = yield select(selectChatMessagesState),
			{dialog} = yield select(selectChatDialogState);

		if(!dialog) {
			//clear message state
			yield put(chatMessagesClear());
			return;
		}

		//make api call
		const resp: IGetMessagesResp = yield call(chatAPI.getMessagesForChat, dialog, offset + 1),
			normalizedResp = normalizeMessages(resp.data.data);

		//add data to store
		yield put(messagesAddMany(normalizedResp.entities.messages));
		yield put(dialogsAddMany(normalizedResp.entities.dialogs));
		yield put(usersAddMany(normalizedResp.entities.users));

		//success message loading
		yield put(chatMessagesSuccess({
			data: normalizedResp.result,
			offset: resp.data.page,
			totalPages: resp.data.totalPages
		}));
	}
	catch (e) {
		//set error
		yield put(chatMessagesError());
	}
}

function *watchChatMessagesSaga() {
	yield all([
		takeEvery(chatMessagesStart.type, getMessagesForChatSaga)
	]);
}

export default watchChatMessagesSaga;
