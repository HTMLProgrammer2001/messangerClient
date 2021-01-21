import appReducer, {appStart, appError, appSuccess, initialState} from './slice';


describe('Test app slice', () => {
	it('Test initial state', () => {
		expect(appReducer(initialState, {type: 'FAKE'})).toMatchObject(initialState);
	});

	it('Test start ban', () => {
		//test loading change
		expect(appReducer(initialState, appStart())).toMatchObject({
			...initialState,
			isLoading: true
		});

		//test initialized reset
		expect(appReducer({...initialState, initialized: true}, appStart())).toMatchObject({
			...initialState,
			isLoading: true,
			initialized: false
		});
	});

	it('Test app error', () => {
		const ERROR = 'ERROR';

		//test error set
		expect(appReducer({...initialState, isLoading: true}, appError(ERROR))).toMatchObject({
			...initialState,
			isLoading: false,
			initialized: true
		});
	});

	it('Test app success', () => {
		expect(appReducer({...initialState, isLoading: true}, appSuccess())).toMatchObject({
			...initialState,
			initialized: true
		});
	});
});
