import React from 'react';
import {mount} from 'enzyme';

import PopUpElement from './index';
import Content from './Content';

import PopUpContext from '../../../utils/context/PopUpContext';
import styles from './styles.module.scss';


describe('PopUpElement test: ', () => {
	it('Mounted', () => {
		const pop = mount(
			<PopUpContext.Provider value={{
				renderElements: [() => <div className="test">Test</div>],
				setElement: () => {}
			}}>
				<PopUpElement/>
			</PopUpContext.Provider>
		);

		expect(pop.html()).toMatchSnapshot();
	});

	it('Not render by default', () => {
		const pop = mount(<PopUpElement/>);
		expect(pop).toBeTruthy();
	});

	it('Test close', () => {
		const spy = jest.fn();

		const pop = mount(
			<PopUpContext.Provider value={{
				renderElements: [() => <div className="test">Test</div>],
				setElement: spy
			}}>
				<PopUpElement/>
			</PopUpContext.Provider>
		);

		const content = pop.find(Content);
		expect(content.exists()).toBeTruthy();

		//click close button
		pop.find(`.${styles.popUp_close}`).simulate('click');

		expect(spy.mock.calls.length).toBe(1);
	});
});
