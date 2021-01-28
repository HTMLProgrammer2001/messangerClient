import {all} from 'redux-saga/effects';

import newDialog from './newDialog'
import setStatus from './status';


function *watchDialogSaga() {
	yield all([
		newDialog(),
		setStatus()
	]);
}

export default watchDialogSaga;
