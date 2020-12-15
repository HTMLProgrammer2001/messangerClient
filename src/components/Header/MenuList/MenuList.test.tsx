import React from 'react';
import {mount, shallow} from 'enzyme';

import MenuList from './';
import styles from '../styles.module.scss';


describe('Menu list test', () => {
	it('Mounted', () => {
		const menuList = shallow(<MenuList isOpen={true}/>);
		expect(menuList.html()).toMatchSnapshot();
	});

	it('Check hide mode', () => {
		const menuList = shallow(<MenuList isOpen={false}/>);
		expect(menuList.find(`.${styles.show}`).exists()).toBeFalsy();
	});

	it('Check show mode', () => {
		const menuList = mount(<MenuList isOpen={true}/>);
		expect(menuList.find('ul').hasClass(styles.show)).toBeTruthy();
	});
});
