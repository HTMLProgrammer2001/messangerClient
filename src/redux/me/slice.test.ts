import meReducer, {meStart, meSet, meReset, initialState} from './slice';


describe('Test me slice', () => {
	it('Test initial value on other action', () => {
		expect(meReducer(initialState, {type: 'FAKE'})).toMatchObject(initialState);
	});

	it('Test start', () => {
		expect(meReducer(initialState, meStart())).toMatchObject({
			...initialState,
			isLoading: true
		});
	});

	it('Test reset', () => {
		expect(meReducer({...initialState, isLoading: true, user: 'test' as any}, meReset()))
			.toMatchObject(initialState);
	});

	it('Test set', () => {
		const user = 'user' as any;
		expect(meReducer({...initialState, isLoading: true}, meSet(user))).toMatchObject({
			...initialState,
			isLoading: false,
			user
		});
	});
});
