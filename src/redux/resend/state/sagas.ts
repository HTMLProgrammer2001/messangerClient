import {takeEvery, call, put, all, select} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {resendStart, resendError, resendSuccess} from './slice';
import {selectChatSelectedState, chatSelectedClear} from '../../chat/selected';
import {selectChatDialogState} from '../../chat/dialog/slice';
import {chatMessagesAdd} from '../../chat/messages/slice';
import {usersAddMany} from '../../users';
import {dialogsAddMany} from '../../dialogs';
import {messagesAddMany} from '../../messages';
import messagesAPI from '../../../utils/api/messageActionsAPI';
import normalizeMessages from '../../../utils/normalizers/messagesNormalize';


function* resendSaga({payload: to}: ReturnType<typeof resendStart>){
	try{
		//get data from store
		const messages = yield select(selectChatSelectedState),
			{dialog} = yield select(selectChatDialogState);

		//make api call
		const resp = yield call(messagesAPI.resendMessages, messages, to);

		//normalize
		const {entities} = normalizeMessages(resp.data.messages);

		//update store
		yield put(usersAddMany(entities.users));
		yield put(messagesAddMany(entities.messages));
		yield put(dialogsAddMany(entities.dialogs));

		if(entities.dialogs[dialog])
			yield put(chatMessagesAdd({message: entities.dialogs[dialog].lastMessage as any, first: true}));

		yield put(resendSuccess());
		yield put(chatSelectedClear());

		//show success message
		toast.success('Messages was resent');
	}
	catch (e) {
		toast.error(e.response?.data.message || e.message);
		yield put(resendError());
	}
}

function* resendWatchSaga() {
	yield all([takeEvery(resendStart.type, resendSaga)]);
}

export default resendWatchSaga;
