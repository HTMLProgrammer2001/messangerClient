import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';

import {SearchItem} from './';
import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';


describe('Unconnected dialog item test: ', () => {
	const mockDialog: IDialog = {_id: '1', name: 'Test name', nick: 'dlg', lastMessage:
			{text: 'text', time: '19:02AM'}, unreaded: 0};

	let dialog: ShallowWrapper = null,
		fn = jest.fn();

	beforeEach(() => {
		fn = jest.fn(),
		dialog = shallow(<SearchItem dialog={mockDialog} changeCurrent={fn} current={mockDialog._id}/>);
	});

	it('Mounted and snapshot', () => {
		expect(dialog).toMatchSnapshot();
	});

	it('Check active state', () => {
		expect(dialog.find(`.${styles.active}`).exists()).toBeTruthy();
	});

	it('Check unactive state', () => {
		dialog = shallow(<SearchItem dialog={mockDialog} changeCurrent={fn} current={mockDialog._id + 1}/>);
		expect(dialog.find(`.${styles.active}`).exists()).toBeFalsy();
	});

	it('Check unreaded hide', () => {
		expect(dialog.find(`.${styles.dialog_unreaded}`).exists()).toBeFalsy();
	});

	it('Check unreaded show', () => {
		dialog = shallow(<SearchItem
			dialog={{...mockDialog, unreaded: 3}}
			changeCurrent={fn}
			current={mockDialog._id + 1}
		/>);

		expect(dialog.find(`.${styles.dialog_unreaded}`).text()).toBe('3');
	});

	it('Check click handler', () => {
		dialog.simulate('click');
		expect(fn.mock.calls.length).toBe(1);
	});
});
