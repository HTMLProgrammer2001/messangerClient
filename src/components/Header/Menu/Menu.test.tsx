import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';

import Menu from './';
import styles from '../styles.module.scss';
import MenuList from '../MenuList';


describe('Buttons test', () => {
	const checkMode = (menu: ShallowWrapper, mode: boolean) => {
		expect(menu.find(MenuList).prop('isOpen')).toBe(mode);
	};

	it('Mounted', () => {
		const menu = shallow(<Menu/>);
		expect(menu.html()).toMatchSnapshot();
	});

	it('Check hide by default', () => {
		const menu = shallow(<Menu/>);
		checkMode(menu, false);
	});

	it('Check toggle', () => {
		const menu = shallow(<Menu/>);

		menu.find(`.${styles.menu_icon}`).simulate('click');
		checkMode(menu, true);

		menu.find(`.${styles.menu_icon}`).simulate('click');
		checkMode(menu, false);
	});
});
