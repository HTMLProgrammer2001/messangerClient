import {takeLatest, put, all, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {IGetDialogResponse} from '../../../interfaces/Responses/chat/IGetDialogResponse';
import {searchSetCurrent} from '../../search/state/slice';
import {chatDialogStart, chatDialogError, chatDialogSuccess} from './slice';
import {dialogsAdd} from '../../dialogs';
import chatAPI from '../../../utils/api/chatAPI';


function* getChatDialogSaga({payload}: ReturnType<typeof searchSetCurrent>){
	//set loading in true
	yield put(chatDialogStart());

	try{
		const resp: AxiosResponse<IGetDialogResponse> = yield call(chatAPI.getDialogByNick, payload);

		//set data to store
		yield put(dialogsAdd(resp.data.dialog));
		yield put(chatDialogSuccess({nick: payload, id: resp.data.dialog._id}));
	}
	catch(e){
		//set error
		yield put(chatDialogError(e.response?.data.message || e.message));
	}
}

function* watchChatDialogSaga(){
	//setup watchers
	yield all([
		takeLatest(searchSetCurrent.type, getChatDialogSaga)
	]);
}

export default watchChatDialogSaga;
