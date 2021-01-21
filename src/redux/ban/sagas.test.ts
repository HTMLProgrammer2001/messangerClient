import {call, put} from 'redux-saga/effects';

jest.mock('../../utils/api/chatAPI');

import chatAPI from '../../utils/api/chatAPI';
import {banSaga} from './sagas';
import {banStart, banSuccess, banError} from './slice';
import {usersAdd} from '../users';

import {IUser} from '../../interfaces/IUser';


describe('Test ban saga', () => {
	const ID = '12345678';

	it('Test success', () => {
		const message = 'Success',
			newUser: IUser = {_id: '1', isBanned: false, nickname: '1', name: 'Test', opts: {}};

		const saga = banSaga(banStart(ID));
		expect(saga.next().value).toEqual(call(chatAPI.ban, ID));

		//test store update call
		expect(saga.next({data: {message, newUser}} as any).value).toEqual(put(banSuccess()));
		expect(saga.next().value).toEqual(put(usersAdd(newUser)));
	});

	it('Test error', () => {
		const message = 'Error';

		const saga = banSaga(banStart(ID));
		expect(saga.next().value).toEqual(call(chatAPI.ban, ID));

		//test error
		expect(saga.throw(new Error(message) as any).value).toEqual(put(banError(message)));
	});
});
