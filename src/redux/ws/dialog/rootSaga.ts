import {all} from 'redux-saga/effects';

import updateMessage from './updateMessage';
import deleteMessage from './deleteMessage';
import banUser from './banUser';
import setStatus from './status';


function *watchDialogSaga() {
	yield all([
		updateMessage(),
		deleteMessage(),
		banUser(),
		setStatus()
	]);
}

export default watchDialogSaga;
