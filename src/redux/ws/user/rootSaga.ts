import {all} from 'redux-saga/effects';

import online from './online';
import offline from './offline';
import toggleBan from './banUser';


function *watchUserSaga() {
	yield all([
		online(),
		offline(),
		toggleBan()
	]);
}

export default watchUserSaga;
