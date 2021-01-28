import {all} from 'redux-saga/effects';

import update from './updateMessage';
import deleteMessage from './deleteMessage';
import newMessage from './newMessage';
import viewMessages from './viewMessage';


function *watchMessageSaga() {
	yield all([
		update(),
		deleteMessage(),
		newMessage(),
		viewMessages()
	]);
}

export default watchMessageSaga;
