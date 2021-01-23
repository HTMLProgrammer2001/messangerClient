import signInReducer, {
	signInResend, signInVerify, signInCodeVerify,
	signInReset, signInError, signInSuccess, initialState
} from './slice';


describe('Test signin reducer', () => {
	const signinData = {
		phone: '+380506754224',
		name: 'Yura',
		nickname: 'htmlprogrammer'
	};

	it('Test verify', () => {
		expect(signInReducer(initialState, signInVerify(signinData))).toEqual({
			...initialState,
			isLoading: true
		});

		expect(signInReducer(initialState, signInCodeVerify(signinData))).toEqual({
			...initialState,
			isLoading: true
		});
	});

	it('Test signin error', () => {
		const errors = {
			_error: 'Error'
		};

		expect(signInReducer({...initialState, isLoading: true}, signInError(errors))).toEqual({
			...initialState,
			isLoading: false,
			errors
		});
	});

	it('Test reset', () => {
		expect(signInReducer({
			...initialState,
			verifing: true,
			errors: {},
			isLoading: true
		}, signInReset())).toEqual(initialState);
	});

	it('Test resend', () => {
		expect(signInReducer(initialState, signInResend())).toEqual(initialState);
	});

	it('Test success', () => {
		expect(signInReducer(initialState, signInSuccess())).toEqual({
			verifing: true,
			isLoading: false,
			errors: null
		});
	});
});
