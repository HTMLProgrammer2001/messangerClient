import React from 'react';

import UserAvatar from '../../../../Common/UserAvatar';
import styles from './styles.module.scss';
import {IMessage} from '../../../../../interfaces/IMessage';


type IMessageProps = IMessage;

const Message: React.FC<IMessageProps> = (props) => (
	<div className={styles.message}>
		<div className={styles.message_content}>
			<UserAvatar
				name={props.author.name}
				size={45}
				avatar={props.author.avatar}
			/>

			<div className={styles.message_data}>
				<div className={styles.message_from}>
					{props.author.name}
				</div>

				<div className={styles.message_text}>
					{props.message}
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
