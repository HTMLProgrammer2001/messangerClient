import {all} from 'redux-saga/effects';

import avatarSaga from './avatar/sagas';
import nameSaga from './name/sagas';
import nickSaga from './nick/sagas';


function* editMeSaga() {
	yield all([
		avatarSaga(),
		nameSaga(),
		nickSaga()
	]);
}

export default editMeSaga;
