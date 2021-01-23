import {call, put} from 'redux-saga/effects';

import {changeSaga, changeCodeSaga, changeResendSaga} from './sagas';
import {changeReset, changeError, changeSuccess, changeVerify, changeResend, changeCodeVerify} from './slice';
import {meSet} from '../me/slice';
import userActionsAPI from '../../utils/api/userActionsAPI';


jest.mock('../../utils/api/userActionsAPI');

describe('Change sagas', () => {
	describe('Test change saga', () => {
		const changeData = {
			newPhone: '+380666876892',
			oldPhone: '+380506564229'
		};

		it('Test success change', () => {
			const saga = changeSaga(changeVerify(changeData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.changePhone, changeData));
			expect(saga.next().value).toEqual(put(changeSuccess()));
		});

		it('Test error change', () => {
			const error = 'ERROR';
			const saga = changeSaga(changeVerify(changeData));

			//test error
			expect(saga.next().value).toEqual(call(userActionsAPI.changePhone, changeData));
			expect(saga.throw(new Error(error)).value).toEqual(put(changeError({_error: error})));
		});
	});

	describe('Change code saga test', () => {
		const changeData = {
			newPhone: '+380996545221',
			oldPhone: '+380506564229',
			oldCode: '23156257',
			newCode: '09463213'
		};

		it('Test success code', () => {
			const saga = changeCodeSaga(changeCodeVerify(changeData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.confirmChangePhone, changeData));

			//test store change
			expect(saga.next().value).toEqual(put(changeReset()));
			expect(saga.next().value).toEqual(put(meSet(null)));
		});

		it('Test error code', () => {
			const saga = changeCodeSaga(changeCodeVerify(changeData)),
				error = 'ERROR';

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.confirmChangePhone, changeData));

			//test error
			expect(saga.throw(new Error(error)).value).toEqual(put(changeError({_error: error})));
		});
	});

	describe('Test change resend', () => {
		const resendData = {
			phone: '+380673421224'
		};

		it('Change resend success', () => {
			const saga = changeResendSaga(changeResend(resendData));

			//test api call
			expect(saga.next().value).toEqual(call(userActionsAPI.resendChange, resendData));
		});
	});
});
