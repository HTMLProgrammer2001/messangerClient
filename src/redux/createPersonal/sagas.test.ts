import {call, put} from 'redux-saga/effects';

import {createPersonalSaga} from './sagas';
import {createPersonalSuccess, createPersonalError, createPersonalStart} from './slice';
import {searchSetCurrent} from '../search/state/slice';
import chatAPI from '../../utils/api/chatAPI';

jest.mock('../../utils/api/chatAPI');


describe('Test create personal saga', () => {
	const id = '112233445566';

	it('Test success', () => {
		const saga = createPersonalSaga(createPersonalStart(id)),
			current = '23413579';

		//test api call
		expect(saga.next().value).toEqual(call(chatAPI.createPersonal, id));

		//change store
		saga.next();
		expect(saga.next(current).value).toEqual(put(searchSetCurrent(current)));
		expect(saga.next().value).toEqual(put(createPersonalSuccess()));
	});

	it('Test error', () => {
		const saga = createPersonalSaga(createPersonalStart(id)),
			error = 'error';

		saga.next();
		expect(saga.throw(new Error(error)).value).toEqual(put(createPersonalError(error)));
	});
});
