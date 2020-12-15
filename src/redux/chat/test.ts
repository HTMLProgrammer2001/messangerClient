import chatReducer, {IChatState} from './reducer';
import {chatLoadError, chatLoadStart, chatLoadSuccess} from './actions';
import {IMessage} from '../../interfaces/IMessage';


describe('Test chat reducer: ', () => {
	let state: IChatState = {
		chatID: 1,
		with: {
			id: 1,
			nick: 'dlg1',
			name: 'Some name',
			lastSeen: 'online'
		},
		messages: [{
			id: 1,
			type: 'text',
			time: +(new Date()) - 3600 * 1455 * 1000,
			text: 'Test text',
			from: {
				id: 1,
				name: 'Some name',
				nick: 'nick',
				lastSeen: 'online'
			}
		}, {
			id: 1,
			type: 'text',
			time: +(new Date()) - 3600 * 21 * 1000,
			text: 'Test text',
			from: {
				id: 1,
				name: 'Some name',
				nick: 'nick',
				lastSeen: 'online'
			}
		}, {
			id: 1,
			type: 'text',
			time: +(new Date()),
			text: 'Test text',
			from: {
				id: 1,
				name: 'Some name',
				nick: 'nick',
				lastSeen: 'online'
			}
		}],
		offset: 1,
		loading: false,
		error: null
	};

	it('Should return initial state by default', () => {
		expect(chatReducer(state, <any>{type: 'TEST_TYPE'})).toBe(state);
	});

	it('Test load start', () => {
		expect(chatReducer(state, chatLoadStart()).loading).toBeTruthy();
		expect(chatReducer({...state, error: 'Error'}, chatLoadStart()).error).toBeNull();
	});

	it('Test load error', () => {
		const err = 'Some error';
		const resState = chatReducer(state, chatLoadError(err));

		expect(resState.loading).toBeFalsy();
		expect(resState.error).toBe(err);
	});

	it('Test load success', () => {
		const messages: IMessage[] = [{
			id: 1,
			text: '2',
			from: {
				id: 1,
				lastSeen: 'online',
				name: 't',
				nick: 'nick'
			},
			type: 'text',
			time: +new Date()
		}];

		const resState = chatReducer(state, chatLoadSuccess(messages));

		expect(resState.error).toBeNull();
		expect(resState.loading).toBeFalsy();
		expect(resState.messages).toEqual(messages);
	});
});
