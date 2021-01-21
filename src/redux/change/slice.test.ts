import changeReducer, {
	changeVerify, changeCodeVerify, changeReset,
	changeResend, changeSuccess, changeError, initialState
} from './slice';


describe('Test change slice', () => {
	it('Test initial state', () => {
		expect(changeReducer(initialState, {type: 'FAKE'})).toEqual(initialState);
	});

	it('Test verify', () => {
		expect(changeReducer(initialState, changeVerify())).toEqual({
			...initialState,
			isLoading: true
		});

		expect(changeReducer(initialState, changeCodeVerify())).toEqual({
			...initialState,
			isLoading: true
		});
	});

	it('Test success', () => {
		expect(changeReducer({...initialState, isLoading: true}, changeSuccess())).toMatchObject({
			...initialState,
			isLoading: false,
			verifing: true
		});
	});

	it('Test error', () => {
		const errors = {err: '1'};

		expect(changeReducer({...initialState, isLoading: true}, changeError(errors))).toMatchObject({
			...initialState,
			isLoading: false,
			errors
		});
	});

	it('Test reset', () => {
		expect(changeReducer({...initialState, verifing: true}, changeReset())).toMatchObject(initialState);
	});
});
