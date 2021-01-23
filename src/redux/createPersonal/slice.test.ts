import personalReducer, {
	initialState, createPersonalStart,
	createPersonalSuccess, createPersonalError
} from './slice';


describe('Test create personal reducer', () => {
	it('Test initial state', () => {
		expect(personalReducer(initialState, {type: 'FAKE'})).toEqual(initialState);
	});

	it('Test create start', () => {
		expect(personalReducer(initialState, createPersonalStart('test'))).toEqual({
			...initialState,
			isLoading: true
		});
	});

	it('Test create error', () => {
		expect(personalReducer(initialState, createPersonalError('error'))).toEqual({
			...initialState,
			isLoading: false
		});
	});

	it('Test create success', () => {
		expect(personalReducer(initialState, createPersonalSuccess())).toEqual({
			...initialState,
			isLoading: false
		});
	});
});
