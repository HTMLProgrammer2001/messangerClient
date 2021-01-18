import React from 'react';


// describe('Dialogs unconnected test: ', () => {
// 	const mockDialogs: IDialog[] = [
// 		{_id: '1', name: 'Test name', nick: 'nick', lastMessage: {text: 'test', time: '19:02AM'}, unreaded: 0},
// 		{_id: '2', name: 'Test name', nick: 'nick', lastMessage: {text: 'test', time: '19:02AM'}, unreaded: 5},
// 	];

// 	it('Mounted', () => {
// 		const dialogs = shallow(<Dialogs dialogs={mockDialogs} current={1} changeCurrent={jest.fn()}/>);
// 		expect(dialogs.html()).toMatchSnapshot();
// 	});

// 	it('Should render same count of dialogs as mock', () => {
// 		const dialogs = shallow(<Dialogs dialogs={mockDialogs} current={1} changeCurrent={jest.fn()}/>);
// 		expect(dialogs.find(`.${styles.dialog}`)).toHaveLength(mockDialogs.length);
// 	});
// });
