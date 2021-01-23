import {call, put} from 'redux-saga/effects';

import {logInCodeSaga, loginResendSaga, logInSaga} from './sagas';
import {logInSuccess, logInResend, logInError, logInVerify, logInCodeVerify} from './slice';
import {meSet} from '../me/slice';
import {usersAdd} from '../users';
import userActionsAPI from '../../utils/api/userActionsAPI';
import {IUser} from '../../interfaces/IUser';


jest.mock('../../utils/api/userActionsAPI');

describe('Login sagas', () => {
	describe('Test login saga', () => {
		const loginData = {phone: '+380506765332'};

		it('Test success login', () => {
			const saga = logInSaga(logInVerify(loginData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.logIn, loginData));
			expect(saga.next().value).toEqual(put(logInSuccess()));
		});

		it('Test error login', () => {
			const error = 'ERROR';
			const saga = logInSaga(logInVerify(loginData));

			//test error
			expect(saga.next().value).toEqual(call(userActionsAPI.logIn, loginData));
			expect(saga.throw(new Error(error)).value).toEqual(put(logInError({_error: error})));
		});
	});

	describe('Login code saga test', () => {
		const loginData = {
			phone: '+380996545221',
			code: '23156257'
		};

		it('Test success code', () => {
			const user: IUser = {_id: '1', name: 'yura', nickname: 'name', isBanned: false},
				saga = logInCodeSaga(logInCodeVerify(loginData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.confirmLogin, loginData));

			//test store change
			expect(saga.next({data: {user}} as any).value).toEqual(put(usersAdd(user)));
			expect(saga.next().value).toEqual(put(meSet(user._id)));
		});

		it('Test error code', () => {
			const saga = logInCodeSaga(logInCodeVerify(loginData)),
				error = 'ERROR';

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.confirmLogin, loginData));

			//test error
			expect(saga.throw(new Error(error)).value).toEqual(put(logInError({_error: error})));
		});
	});

	describe('Test change resend', () => {
		const resendData = {
			phone: '+380673421224'
		};

		it('Change resend success', () => {
			const saga = loginResendSaga(logInResend(resendData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.resendLogin, resendData));
		});
	});
});
