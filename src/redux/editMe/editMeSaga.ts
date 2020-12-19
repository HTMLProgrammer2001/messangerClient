import {all} from 'redux-saga/effects';

import avatarSaga from './avatar/sagas';
import nameSaga from './name/sagas';


function* editMeSaga() {
	yield all([
		avatarSaga(),
		nameSaga()
	]);
}

export default editMeSaga;
