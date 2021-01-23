import {call, put} from 'redux-saga/effects';

import {signInCodeSaga, signInSaga, signInResendSaga} from './sagas';
import {signInSuccess, signInError, signInCodeVerify, signInVerify, signInResend} from './slice';
import {meSet} from '../me/slice';
import userActionsAPI from '../../utils/api/userActionsAPI';
import {IUser} from '../../interfaces/IUser';


jest.mock('../../utils/api/userActionsAPI');

describe('Sign in sagas', () => {
	describe('Test signIn saga', () => {
		const signInData = {
			phone: '+380506765332',
			name: 'yura',
			nickname: 'Yurec'
		};

		it('Test success signIn', () => {
			const saga = signInSaga(signInVerify(signInData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.signIn, signInData));
			expect(saga.next().value).toEqual(put(signInSuccess()));
		});

		it('Test error signIn', () => {
			const error = 'ERROR';
			const saga = signInSaga(signInVerify(signInData));

			//test error
			expect(saga.next().value).toEqual(call(userActionsAPI.signIn, signInData));
			expect(saga.throw(new Error(error)).value).toEqual(put(signInError({_error: error})));
		});
	});

	describe('Sign in code saga test', () => {
		const signInData = {
			phone: '+380996545221',
			code: '23156257',
			name: 'Yura',
			nickname: 'Yurec'
		};

		it('Test success code', () => {
			const user = {_id: '1'},
				token = 'token';

			const mock = jest.fn();
			mock.mockReturnValue(null);
			window.localStorage.__proto__.setItem = mock;

			const saga = signInCodeSaga(signInCodeVerify(signInData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.confirmSignIn, signInData));

			//test store change
			expect(saga.next({data: {user, token}} as any).value).toEqual(put(meSet(user._id)));
			expect(mock).toBeCalledWith('token', token);
		});

		it('Test error code', () => {
			const saga = signInCodeSaga(signInCodeVerify(signInData)),
				error = 'ERROR';

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.confirmSignIn, signInData));

			//test error
			expect(saga.throw(new Error(error)).value).toEqual(put(signInError({_error: error})));
		});
	});

	describe('Test change resend', () => {
		const resendData = {
			phone: '+380673421224',
			name: 'Name',
			nickname: 'Name'
		};

		it('Change resend success', () => {
			const saga = signInResendSaga(signInResend(resendData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.resendSignIn, resendData));
		});
	});
});
