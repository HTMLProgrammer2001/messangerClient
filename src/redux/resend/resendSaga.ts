import {all} from 'redux-saga/effects';

import dialogs from './dialogs/sagas';
import state from './state/sagas';


export default function *resendSaga() {
	yield all([
		dialogs(),
		state()
	]);
}
