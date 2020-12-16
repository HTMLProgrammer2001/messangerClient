import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from './styles.module.scss';
import {RootState} from '../../../../redux';
import {selectChatState} from '../../../../redux/chat/selectors';

import Message from './Message';
import RelativeDate from '../../../Common/RelativeDate';
import dateToString from '../../../../utils/helpers/dateToString';


const mapStateToProps = (state: RootState) => ({
	...selectChatState(state)
});

const connected = connect(mapStateToProps);

type IChatProps = ConnectedProps<typeof connected>;

const Chat: React.FC<IChatProps> = ({messages, error, loading, offset}) => {
	if(!messages.length)
		return (
			<div className={styles.chat}>
				<div className={styles.noMessage}>No messages</div>
			</div>
		);

	let lastDate = dateToString(messages[0].time);

	return (
		<div className={styles.chat}>
			{
				error &&
				<div className="red">{error}</div>
			}

			{
				loading &&
				<div>Loading...</div>
			}

			<RelativeDate time={messages[0].time}/>

			{
				messages.map((message) => {
					const isSame = lastDate == dateToString(message.time);
					lastDate = dateToString(message.time);

					return (
						<>
							{
								!isSame &&
									<RelativeDate time={message.time}/>
							}

							<Message {...message} key={message.id}/>
						</>
					)
				})
			}
		</div>
	);
};

export default connected(Chat);
