import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put, all, call} from 'redux-saga/effects';

import ws from '../../../utils/ws/appWebsocket';
import {dialogsAdd} from '../../dialogs';
import {DialogStatus} from '../../../constants/DialogStatus';


//create actions
export const wsDialogSetStatus = createAction<{dialog: string, status: string}>('WS/dialog/setStatus');
export const wsSendDialogStatus = createAction<{dialog: string, status: DialogStatus}>('WS/dialog/sendStatus');

//sagas
function *dialogSetStatusSaga({payload}: ReturnType<typeof wsDialogSetStatus>) {
	const {dialog, status} = payload;
	yield put(dialogsAdd({_id: dialog, status} as any));
}

function *dialogSendStatusSaga({payload}: ReturnType<typeof wsSendDialogStatus>) {
	const {status, dialog} = payload;
	yield call(ws.changeDialogStatus.bind(ws), dialog, status);
}

function *watchDialogSetStatusSaga() {
	yield all([
		takeEvery(wsSendDialogStatus.type, dialogSendStatusSaga),
		takeEvery(wsDialogSetStatus.type, dialogSetStatusSaga)
	]);
}

export default watchDialogSetStatusSaga;
