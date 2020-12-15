import React from 'react';
import {shallow} from 'enzyme';

import RelativeDate from './';


describe('Relative date test: ', () => {
	const testCases = [{
		date: +new Date(),
		str: 'Today'
	}, {
		date: +new Date() - 3600 * 1000 * 24,
		str: 'Yesterday'
	}, {
		date: +new Date(0),
		str: '1970-1-1'
	}];

	it('Mounted', () => {
		const relDate = shallow(<RelativeDate time={+new Date()}/>);
		expect(relDate.html()).toMatchSnapshot();
	});

	it('Test cases', () => {
		testCases.forEach((testCase) => {
			const relDate = shallow(<RelativeDate time={testCase.date}/>);
			expect(relDate.text()).toBe(testCase.str);
		});
	});
});
