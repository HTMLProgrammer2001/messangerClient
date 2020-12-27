import React from 'react';
import {useSelector} from 'react-redux';

import {selectSearchMessages} from '../../../../../redux/search/slice';
import {IMessage} from '../../../../../interfaces/IMessage';


const MessagesSection: React.FC<{}> = () => {
	const messages = useSelector(selectSearchMessages) as IMessage[];

	if(!messages.length)
		return null;

	return (
		<div>
			<b>Messages</b>

			{messages.map(message => (
				<div key={message._id}>{message.text}</div>
			))}
		</div>
	);
};

export default MessagesSection;
