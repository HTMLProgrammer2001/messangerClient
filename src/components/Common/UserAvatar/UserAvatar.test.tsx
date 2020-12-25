import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import UserAvatar from './';
import styles from './styles.module.scss';
import store from '../../../redux';


describe('User avatar test', () => {
	const mockData = {
		avatar: 'https://avatar.com/test.jpg',
		name: {
			full: 'Yura Prisyazhnyy',
			short: 'YP'
		}
	};

	it('Mounted', () => {
		const avatar = mount(
			<Provider store={store}>
				<UserAvatar name={mockData.name.full}/>
			</Provider>
		);

		expect(avatar.html()).toMatchSnapshot();
	});

	it('Show avatar', () => {
		const avatar = mount(
			<Provider store={store}>
				<UserAvatar
					name={mockData.name.full}
					avatar={mockData.avatar}
				/>
			</Provider>
		);

		//check exists of needed element and missing of unneeded element
		expect(avatar.find(`.${styles.avatar}`)).toHaveLength(1);
		expect(avatar.find(`.${styles.initials}`)).toHaveLength(0);

		//check that image has attribute src same as mock data
		const srcProp = avatar.find(`.${styles.avatar}`).at(0).prop('src');
		expect(srcProp).toBe(mockData.avatar);

		expect(avatar.html()).toMatchSnapshot();
	});

	it('Show name', () => {
		const avatar = mount(
			<Provider store={store}>
				<UserAvatar name={mockData.name.full}/>
			</Provider>
		);

		//check exists of needed element and missing of unneeded element
		expect(avatar.find(`.${styles.avatar}`)).toHaveLength(0);
		expect(avatar.find(`.${styles.initials}`)).toHaveLength(1);

		//check that short name is same as mock data
		const nameText = avatar.find(`.${styles.initials}`).at(0).text();
		expect(nameText).toBe(mockData.name.short);

		expect(avatar.html()).toMatchSnapshot();
	});
});
