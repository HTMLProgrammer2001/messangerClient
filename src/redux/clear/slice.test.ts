import clearReducer, {clearStart, clearSuccess, clearError, initialState} from './slice';


describe('Test clear slice', () => {
	it('Test initial state', () => {
		expect(clearReducer(initialState, {type: 'FAKE'})).toMatchObject(initialState);
	});

	it('Test start clear', () => {
		//test loading change
		expect(clearReducer(initialState, clearStart({id: '1', type: 1}))).toMatchObject({
			...initialState,
			isLoading: true
		});

		//test error reset
		expect(clearReducer({...initialState, error: 'Error'}, clearStart({id: '1', type: 0}))).toMatchObject({
			...initialState,
			isLoading: true,
			error: null
		});
	});

	it('Test clear error', () => {
		const ERROR = 'ERROR';

		//test error set
		expect(clearReducer({...initialState, isLoading: true}, clearError(ERROR))).toMatchObject({
			...initialState,
			isLoading: false,
			error: ERROR
		});
	});

	it('Test clear success', () => {
		expect(clearReducer({...initialState, isLoading: true}, clearSuccess())).toMatchObject(initialState);
	});
});
