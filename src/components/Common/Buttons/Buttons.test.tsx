import React from 'react';
import {shallow} from 'enzyme';

import Buttons from './';
import styles from './styles.module.scss';


describe('Buttons test', () => {
	it('Mounted', () => {
		const buttons = shallow(<Buttons isValid={true} onNext={() => {}}/>);
		expect(buttons.html()).toMatchSnapshot();
	});

	it('Show valid', () => {
		const buttons = shallow(<Buttons isValid={true} onNext={() => {}}/>);
		expect(buttons.find(`.${styles.button}`).at(1).prop('disabled')).toBeFalsy();
	});

	it('Show invalid', () => {
		const buttons = shallow(<Buttons isValid={false} onNext={() => {}}/>);
		expect(buttons.find(`.${styles.button}`).at(1).prop('disabled')).toBeTruthy();
	});
});
