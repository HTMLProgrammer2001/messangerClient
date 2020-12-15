import dialogsReducer, {IDialogsState} from './reducer';
import {dialogsChangeCurrent, dialogsLoadError, dialogsLoadStart} from './actions';


describe('Test dialogs reducer: ', () => {
	const state: IDialogsState = {
		dialogs: [{
			id: 1,
			name: 'Test',
			avatar: 'https://www.kinonews.ru/insimgs/poster/poster9623_1.jpg',
			lastMessage: {
				text: 'Test text',
				time: '19:02PM'
			},
			nick: 'nik',
			unreaded: 0
		},
			{
				id: 2,
				name: 'Test',
				avatar: 'https://www.kinonews.ru/insimgs/poster/poster9623_1.jpg',
				lastMessage: {
					text: 'Test text',
					time: '19:02PM'
				},
				nick: 'nik2',
				unreaded: 5
			}],
		offset: 1,
		current: 1,
		loading: false,
		error: null
	};

	it('Should return initial state by default', () => {
		expect(dialogsReducer(state, <any>{type: 'TEST_TYPE'})).toBe(state);
	});

	it('Test dialogs load start', () => {
		const resState = dialogsReducer(state, dialogsLoadStart());

		expect(resState.loading).toBeTruthy();
		expect(resState.error).toBeNull();
	});

	it('Test dialogs load error', () => {
		const err = 'Some error';
		const resState = dialogsReducer(state, dialogsLoadError(err));

		expect(resState.loading).toBeFalsy();
		expect(resState.error).toBe(err);
	});

	it('Test dialogs load success', () => {

	});

	it('Test dialogs update', () => {
		let resState = dialogsReducer(state, dialogsChangeCurrent(state.current));
		expect(resState.current).toBeNull();

		resState = dialogsReducer(state, dialogsChangeCurrent(state.current));
		expect(resState.current).toBe(state.current);
	});
});

describe('Tst dialogs saga: ', () => {

});
