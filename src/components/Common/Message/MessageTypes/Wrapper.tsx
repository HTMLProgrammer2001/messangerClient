import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';
import styles from '../styles.module.scss';
import UserAvatar from '../../UserAvatar';
import secondsToTime from '../../../../utils/helpers/secondsToTime';


type IWrapper = {
	message: IMessage
	children: any
}

const Wrapper: React.FC<IWrapper> = ({message, children}) => (
	<div className={styles.message}>
		<div className={styles.message_content}>
			<UserAvatar
				name={message.author.name}
				size={45}
				avatar={message.author.avatar}
			/>

			<div className={styles.message_data}>
				<div className={styles.message_from}>
					{message.author.name}
				</div>

				<div className={styles.message_text}>
					{children}
				</div>
			</div>
		</div>

		<div className={styles.message_time}>
			{secondsToTime(message.time)}
		</div>
	</div>
);

export default Wrapper;
