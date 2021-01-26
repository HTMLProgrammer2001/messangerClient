import {all} from 'redux-saga/effects';

import wsDialogAPI from './wsDialogAPI';
import banUser from './banUser';


function *watchDialogSaga() {
	yield all([
		wsDialogAPI(),
		banUser()
	]);
}

export default watchDialogSaga;
