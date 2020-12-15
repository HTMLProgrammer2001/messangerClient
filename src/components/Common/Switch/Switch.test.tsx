import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';

import Switch from './';
import styles from './styles.module.scss';


describe('Switch test', () => {
	let swState = (sw: ShallowWrapper, exp: boolean) => {
		expect(sw.find(`.${styles.switch}`).at(0).hasClass(styles.active)).toBe(exp);
	};

	it('Mounted', () => {
		const sw = shallow(<Switch onChange={() => {}}/>);
		expect(sw.html()).toMatchSnapshot();
	});

	it('Show switch default off', () => {
		const sw = shallow(<Switch onChange={() => {}}/>);
		swState(sw, false);
	});

	it('Show switch default on', () => {
		const sw = shallow(<Switch onChange={() => {}} defaultState={true}/>);
		swState(sw, true);
	});

	it('Test switch change', () => {
		const fn = jest.fn();

		const sw = shallow(<Switch onChange={fn}/>);
		sw.simulate('click');

		swState(sw, true);
		expect(fn.call.length).toBe(1);
	});
});
