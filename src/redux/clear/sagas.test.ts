import {call, put} from 'redux-saga/effects';

import {clearSaga} from './sagas';
import {clearError, clearSuccess, clearStart} from './slice';
import {chatMessagesClear} from '../chat/messages/slice';
import chatAPI from '../../utils/api/chatAPI';

jest.mock('../../utils/api/chatAPI');


describe('Test clear saga', () => {
	it('Test success personal clear', () => {
		const ID = '1',
			type = 1;

		//test api call and store change
		const saga = clearSaga(clearStart({id: ID, type}));
		expect(saga.next().value).toEqual(call(chatAPI.clear, {user: ID}));
		expect(saga.next().value).toEqual(put(clearSuccess()));

		//test current dialog reset
		saga.next();
		expect(saga.next({user: ID, dialog: null})).toEqual({done: false, value: put(chatMessagesClear())})
	});

	it('Test success dialog clear', () => {
		const ID = '1',
			type = 2;

		//test api call and store change
		const saga = clearSaga(clearStart({id: ID, type}));
		expect(saga.next().value).toEqual(call(chatAPI.clear, {dialog: ID}));
		expect(saga.next().value).toEqual(put(clearSuccess()));

		//test current dialog reset
		saga.next();
		expect(saga.next({user: null, dialog: null})).toEqual({done: true});
	});

	it('Test error', () => {
		const ID = '1',
			type = 2,
			error = 'Error';

		//test api call and store change
		const saga = clearSaga(clearStart({id: ID, type}));
		saga.next();
		expect(saga.throw(new Error(error)).value).toEqual(put(clearError(error)));
	});
});
