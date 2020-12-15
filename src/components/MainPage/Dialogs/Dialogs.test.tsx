import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';

import {Dialogs} from './';
import styles from './styles.module.scss';
import store from '../../../redux/';

import {IDialog} from '../../../interfaces/IDialog';


describe('Dialogs unconnected test: ', () => {
	const mockDialogs: IDialog[] = [
		{id: 1, name: 'Test name', nick: 'nick', lastMessage: {text: 'test', time: '19:02AM'}, unreaded: 0},
		{id: 2, name: 'Test name', nick: 'nick', lastMessage: {text: 'test', time: '19:02AM'}, unreaded: 5},
	];

	it('Mounted', () => {
		const dialogs = shallow(
			<Provider store={store}>
				<Dialogs dialogs={mockDialogs}/>
			</Provider>
		);

		expect(dialogs.html()).toMatchSnapshot();
	});

	it('Should render same count of dialogs as mock', () => {
		const dialogs = shallow(
			<Provider store={store}>
				<Dialogs dialogs={mockDialogs}/>
			</Provider>
		);

		const dial = dialogs.find(`.${styles.dialog_wrap}`);

		expect(dialogs.find(`.${styles.dialog}`).length).toBe(mockDialogs.length);
	});
});
