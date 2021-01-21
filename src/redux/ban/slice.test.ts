import banReducer, {banStart, banSuccess, banError, initialState} from './slice';


describe('Test ban slice', () => {
	it('Test initial state', () => {
		expect(banReducer(initialState, {type: 'FAKE'})).toMatchObject(initialState);
	});

	it('Test start ban', () => {
		//test loading change
		expect(banReducer(initialState, banStart('id'))).toMatchObject({
			...initialState,
			isLoading: true
		});

		//test error reset
		expect(banReducer({...initialState, error: 'Error'}, banStart('id'))).toMatchObject({
			...initialState,
			isLoading: true,
			error: null
		});
	});

	it('Test ban error', () => {
		const ERROR = 'ERROR';

		//test error set
		expect(banReducer({...initialState, isLoading: true}, banError(ERROR))).toMatchObject({
			...initialState,
			isLoading: false,
			error: ERROR
		});
	});

	it('Test ban success', () => {
		expect(banReducer({...initialState, isLoading: true}, banSuccess())).toMatchObject(initialState);
	});
});
