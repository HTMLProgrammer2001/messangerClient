import React from 'react';
import {shallow} from 'enzyme';

import {IDialog} from '../../../interfaces/IDialog';
import {Dialogs} from './';
import styles from './styles.module.scss';


describe('Dialogs unconnected test: ', () => {
	const mockDialogs: IDialog[] = [
		{id: 1, name: 'Test name', nick: 'nick', lastMessage: {text: 'test', time: '19:02AM'}, unreaded: 0},
		{id: 2, name: 'Test name', nick: 'nick', lastMessage: {text: 'test', time: '19:02AM'}, unreaded: 5},
	];

	it('Mounted', () => {
		const dialogs = shallow(<Dialogs dialogs={mockDialogs} current={1} changeCurrent={jest.fn()}/>);
		expect(dialogs.html()).toMatchSnapshot();
	});

	it('Should render same count of dialogs as mock', () => {
		const dialogs = shallow(<Dialogs dialogs={mockDialogs} current={1} changeCurrent={jest.fn()}/>);
		expect(dialogs.find(`.${styles.dialog}`)).toHaveLength(mockDialogs.length);
	});
});
