import React from 'react';
import cn from 'classnames';

import styles from '../styles.module.scss';
import {IMessage} from '../../../../../../../interfaces/IMessage';
import {MessageTypes} from '../../../../../../../constants/MessageTypes';
import dateToString from '../../../../../../../utils/helpers/dateToString';

import RelativeDate from '../../../../../../Common/RelativeDate';
import Message from '../../../../../../Common/Message';


type IMessagesProps = {
	messages: IMessage[],
	selected: string[],
	toggle: (id: string) => void
}

const Messages: React.FC<IMessagesProps> = ({messages, selected, toggle}) => {
	let lastDate = dateToString(messages[0]?.time);

	const data = messages.map((message, index) => {
		//check same date as previous
		const isSame = lastDate == dateToString(message.time);
		lastDate = dateToString(message.time);

		return (
			<>
				{!isSame && <RelativeDate time={messages[index - 1].time}/>}

				<div  key={message._id} className={cn(styles.chat_message, 'fa', {
					[styles.noHover]: message.type == MessageTypes.SPECIAL,
					[styles.unreaded]: !message.readed,
					[styles.selected]: selected.includes(message._id)
				})} onClick={() => toggle(message._id)}>
					<Message message={message}/>
				</div>
			</>
		)
	});

	return <>{data}</>;
};

export default Messages;
