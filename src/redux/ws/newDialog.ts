import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put} from 'redux-saga/effects';
import {normalize, schema} from 'normalizr';

import {IDialog} from '../../interfaces/IDialog';
import {IMessage} from '../../interfaces/IMessage';
import {IUser} from '../../interfaces/IUser';

import {usersAddMany} from '../users';
import {dialogsAddMany} from '../dialogs';
import {messagesAddMany} from '../messages';
import {searchDialogsAdd} from '../search/dialogs/slice';


//create actions
export const wsNewDialog = createAction<IDialog>('WS/newDialog');

//normalize
const normalizeDialog = (data: IDialog) => {
	const user = new schema.Entity('users', {}, {idAttribute: '_id'}),
		message = new schema.Entity('messages', {author: user}, {idAttribute: '_id'}),
		dialog = new schema.Entity('dialogs', {lastMessage: message}, {idAttribute: '_id'});

	return normalize<IDialog, {
		users: Record<string, IUser>,
		messages: Record<string, IMessage>,
		dialogs: Record<string, IDialog>
	}>(data, dialog);
};

//create sagas
function *newDialogSaga({payload: dialog}: ReturnType<typeof wsNewDialog>) {
	const normalizedDialog = normalizeDialog(dialog);

	//update store
	yield put(usersAddMany(normalizedDialog.entities.users));
	yield put(messagesAddMany(normalizedDialog.entities.messages));
	yield put(dialogsAddMany(normalizedDialog.entities.dialogs));
	yield put(searchDialogsAdd(normalizedDialog.result));
}

function *newDialogWatchSaga() {
	yield takeEvery(wsNewDialog.type, newDialogSaga);
}

export default newDialogWatchSaga;
