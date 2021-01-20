import React from 'react';
import {shallow} from 'enzyme';

import styles from './styles.module.scss';
import {IMessage} from '../../../interfaces/IMessage';

import EditedMessage from './';


describe('Test edited message element', () => {
	const cancel = jest.fn(),
		message: IMessage = {
			_id: '1',
			message: 'Test',
			type: 0,
			time: +new Date(),
			author: null
		};

	beforeEach(() => {
		cancel.mockReset();
	});

	it('Test render', () => {
		const elem = shallow(<EditedMessage message={message} cancel={cancel}/>);
		expect(elem.text()).toMatchSnapshot();
	});

	it('Test cancel call', () => {
		const elem = shallow(<EditedMessage message={message} cancel={cancel}/>);
		elem.find(`.${styles.close}`).simulate('click');

		expect(cancel).toHaveBeenCalledTimes(1);
	});

	it('Test message render', () => {
		const elem = shallow(<EditedMessage message={message} cancel={cancel}/>);
		expect(elem.find(`.${styles.message}`).text()).toBe(message.message);
	});
});
