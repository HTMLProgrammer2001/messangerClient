import {all} from 'redux-saga/effects';

import updateMessage from './updateMessage';
import deleteMessage from './deleteMessage';
import banUser from './banUser';


function *watchDialogSaga() {
	yield all([
		updateMessage(),
		deleteMessage(),
		banUser()
	]);
}

export default watchDialogSaga;
