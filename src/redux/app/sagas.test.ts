import {put, race} from 'redux-saga/effects';

import {initializeSaga} from './sagas';
import {appError, appSuccess} from './slice';
import {meStart} from '../me/slice';


describe('Test app saga', () => {
	it('Test success', () => {
		const saga = initializeSaga();
		expect(saga.next().value).toEqual(put(meStart()));

		//test store update call
		expect(saga.next().value.type).toEqual(race([]).type);
		expect(saga.next().value).toEqual(put(appSuccess()));
	});

	it('Test error', () => {
		const message = 'Error';

		const saga = initializeSaga();
		expect(saga.next().value).toEqual(put(meStart()));

		//test error
		expect(saga.throw(new Error(message) as any).value).toEqual(put(appError(message)));
	});
});
