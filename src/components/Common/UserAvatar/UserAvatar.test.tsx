import React from 'react';
import {shallow} from 'enzyme';

import UserAvatar from './';
import styles from './styles.module.scss';


describe('User avatar test', () => {
	const mockData = {
		avatar: 'https://avatar.com/test.jpg',
		name: {
			full: 'Yura Prisyazhnyy',
			short: 'YP'
		}
	};

	it('Mounted', () => {
		const avatar = shallow(<UserAvatar name={mockData.name.full}/>);
	});

	it('Show avatar', () => {
		const avatar = shallow(
			<UserAvatar
				name={mockData.name.full}
				avatar={mockData.avatar}
			/>
		);

		//check exists of needed element and missing of unneeded element
		expect(avatar.find(`.${styles.avatar}`).length).toBe(1);
		expect(avatar.find(`.${styles.initials}`).length).toBeFalsy();

		//check that image has attribute src same as mock data
		const srcProp = avatar.find(`.${styles.avatar}`).at(0).prop('src');
		expect(srcProp).toBe(mockData.avatar);

		expect(avatar.html()).toMatchSnapshot();
	});

	it('Show name', () => {
		const avatar = shallow(<UserAvatar name={mockData.name.full}/>);

		//check exists of needed element and missing of unneeded element
		expect(avatar.find(`.${styles.avatar}`).length).toBeFalsy();
		expect(avatar.find(`.${styles.initials}`).length).toBe(1);

		//check that short name is same as mock data
		const nameText = avatar.find(`.${styles.initials}`).at(0).text();
		expect(nameText).toBe(mockData.name.short);

		expect(avatar.html()).toMatchSnapshot();
	});
});
