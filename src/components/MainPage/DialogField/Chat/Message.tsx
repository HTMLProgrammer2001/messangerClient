import React from 'react';

import UserAvatar from '../../../Common/UserAvatar';
import styles from './styles.module.scss';
import {IMessage} from '../../../../interfaces/IMessage';


type IMessageProps = IMessage;

const Message: React.FC<IMessageProps> = (props) => (
	<div className={styles.message}>
		<div className={styles.message_content}>
			<UserAvatar
				name={props.from.name}
				size={45}
				avatar={props.from.avatar}
			/>

			<div className={styles.message_data}>
				<div className={styles.message_from}>
					{props.from.name}
				</div>

				<div className={styles.message_text}>
					{props.text}
				</div>
			</div>
		</div>

		<div className={styles.message_time}>
			{
				new Date(props.time).toLocaleTimeString()
			}
		</div>
	</div>
);

export default Message;
