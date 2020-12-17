import {all} from 'redux-saga/effects';

import avatarSaga from './avatar/sagas';


function* editMeSaga() {
	yield all([
		avatarSaga()
	]);
}

export default editMeSaga;
