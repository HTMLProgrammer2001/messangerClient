import React from 'react';
import {shallow} from 'enzyme';

import Volume from './Volume';


describe('Test audio volume element', () => {
	const onChange = jest.fn();

	beforeEach(() => {
		onChange.mockReset();
	});

	it('Test mount', () => {
		const elem = shallow(<Volume val={0} onChange={onChange}/>);
		expect(elem.html()).toMatchSnapshot();
	});

	it('Test render with different values', () => {
		let elem = shallow(<Volume val={0} onChange={onChange}/>);
		expect(elem.find('.fas').hasClass('fa-volume-off'));

		elem = shallow(<Volume val={50} onChange={onChange}/>);
		expect(elem.find('.fas').hasClass('fa-volume-down'));

		elem = shallow(<Volume val={100} onChange={onChange}/>);
		expect(elem.find('.fas').hasClass('fa-volume-up'));
	});

	it('Test click', () => {
		const elem = shallow(<Volume val={0} onChange={onChange}/>);

		elem.find('.fas').simulate('click');
		expect(elem.find('.fas').hasClass('fa-volume-up'));

		elem.find('.fas').simulate('click');
		expect(elem.find('.fas').hasClass('fa-volume-off'));
	});
});
