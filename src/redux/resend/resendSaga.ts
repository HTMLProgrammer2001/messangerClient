import {all} from 'redux-saga/effects';

import dialogs from './dialogs/sagas';


export default function *resendSaga() {
	yield all([dialogs()]);
}
