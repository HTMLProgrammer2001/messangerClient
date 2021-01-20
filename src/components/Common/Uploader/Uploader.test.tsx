import React from 'react';
import {shallow} from 'enzyme';

import styles from './styles.module.scss';
import Uploader from './';


describe('Test uploader element', () => {
	const cancel = jest.fn();

	beforeEach(() => {
		cancel.mockReset();
	});

	it('Test mount', () => {
		const elem = shallow(<Uploader cancel={cancel} progress={0}/>);
		expect(elem.html()).toMatchSnapshot();
	});

	it('Test progress', () => {
		const elem = shallow(<Uploader cancel={cancel} progress={0.25}/>);
		expect(elem.find(`.${styles.loader_circle}`).prop('strokeDashoffset')).toBe(225);
	});

	it('Test cancel', () => {
		const elem = shallow(<Uploader cancel={cancel} progress={0.25}/>);
		elem.find(`.${styles.loader}`).simulate('click');

		expect(cancel).toHaveBeenCalledTimes(1);
	});

	it('Test icon', () => {
		const elem = shallow(<Uploader cancel={cancel} progress={0.25} icon={true}/>);
		expect(elem.find(`.${styles.loader}`).hasClass(styles.icon));
	});
});
