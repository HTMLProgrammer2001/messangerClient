import React from 'react';
import {mount} from 'enzyme';

import ClosePopup from './ClosePopUp';
import PopUpContext from '../../utils/context/PopUpContext';


describe('Test close popup element', () => {
	const setElement = jest.fn();

	it('Test mount', () => {
		const elem = mount(<ClosePopup/>);
		expect(elem.html()).toMatchSnapshot();
	});

	it('Test close popup', () => {
		const elem = mount(
			<PopUpContext.Provider value={{setElement, renderElements: []}}>
				<ClosePopup/>
			</PopUpContext.Provider>
		);
		elem.find('div').simulate('click');

		expect(setElement).toBeCalledTimes(1);
		expect(setElement).toBeCalledWith(null);
	});
});
