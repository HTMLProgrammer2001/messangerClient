import React from 'react';
import {shallow} from 'enzyme';

import Line from './Line';


describe('Test audio line element', () => {
	const onChange = jest.fn();

	beforeEach(() => {
		onChange.mockReset();
	});

	it('Test mount', () => {
		const elem = shallow(<Line onChange={onChange} val={0}/>);
		expect(elem.html()).toMatchSnapshot();
	});
});
