import {all} from 'redux-saga/effects';

import online from './online';
import offline from './offline';


function *watchUserSaga() {
	yield all([
		online(),
		offline()
	]);
}

export default watchUserSaga;
