import {call, put} from 'redux-saga/effects';

import {meSaga} from './sagas';
import {meSet, meReset} from './slice';
import {usersAdd} from '../users';
import userActionsAPI from '../../utils/api/userActionsAPI';


jest.mock('../../utils/api/userActionsAPI');


describe('Test me saga', () => {
	it('Test without token', () => {
		const mock = jest.fn();
		mock.mockReturnValue(null);
		window.localStorage.__proto__.getItem = mock;

		const saga = meSaga();

		//test
		expect(saga.next().value).toEqual(put(meReset()));
		expect(mock).toBeCalledWith('token');
		expect(mock).toHaveBeenCalledTimes(1);
	});

	it('Test with token', () => {
		const user: any = {_id: '1'},
			mock = jest.fn();

		mock.mockReturnValue('token');
		window.localStorage.__proto__.getItem = mock;

		const saga = meSaga();

		//test
		expect(saga.next().value).toEqual(call(userActionsAPI.getMe));
		expect(saga.next({data: user} as any).value).toEqual(put(meSet(user._id)));
		expect(saga.next().value).toEqual(put(usersAdd(user)));
	});

	it('Test error get me', () => {
		const error = 'error',
			mock = jest.fn();

		mock.mockReturnValue('token');
		window.localStorage.__proto__.getItem = mock;

		const saga = meSaga();

		//test
		saga.next();
		expect(saga.throw(new Error(error)).value).toEqual(put(meReset()));
	});
});
