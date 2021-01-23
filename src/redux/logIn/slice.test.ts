import loginReducer, {
	logInVerify, logInCodeVerify, logInReset, logInResend,
	logInError, logInSuccess, initialState
} from './slice';


describe('Test login reducer', () => {
	const loginData = {
		phone: '+380506754224'
	};

	it('Test verify', () => {
		expect(loginReducer(initialState, logInVerify(loginData))).toEqual({
			...initialState,
			isLoading: true
		});

		expect(loginReducer(initialState, logInCodeVerify(loginData))).toEqual({
			...initialState,
			isLoading: true
		});
	});

	it('Test login error', () => {
		const errors = {
			_error: 'Error'
		};

		expect(loginReducer({...initialState, isLoading: true}, logInError(errors))).toEqual({
			...initialState,
			isLoading: false,
			errors
		});
	});

	it('Test reset', () => {
		expect(loginReducer({
			...initialState,
			verifing: true,
			errors: {},
			isLoading: true
		}, logInReset())).toEqual(initialState);
	});

	it('Test resend', () => {
		expect(loginReducer(initialState, logInResend())).toEqual(initialState);
	});

	it('Test success', () => {
		expect(loginReducer(initialState, logInSuccess())).toEqual({
			verifing: true,
			isLoading: false,
			errors: null
		});
	});
});
