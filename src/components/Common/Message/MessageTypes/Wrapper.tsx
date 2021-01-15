import React, {useContext} from 'react';

import {IMessage} from '../../../../interfaces/IMessage';
import styles from '../styles.module.scss';
import secondsToTime from '../../../../utils/helpers/secondsToTime';

import UserAvatar from '../../UserAvatar';
import PopUpContext from '../../../../utils/context/PopUpContext';
import UserPopup from '../../../PopUps/UserPopup';


type IWrapper = {
	message: IMessage
	children: any
}

const Wrapper: React.FC<IWrapper> = ({message, children}) => {
	const {setElement} = useContext(PopUpContext),
		handler = () => {
			//show popup with info about this user
			setElement(() => <UserPopup userID={message.author._id}/>)
		};

	return (
		<div className={styles.message}>
			<div className={styles.message_content}>
				<div onClick={handler}>
					<UserAvatar
						name={message.author.name}
						size={45}
						avatar={message.author.avatar}
					/>
				</div>

				<div className={styles.message_data}>
					<div className={styles.message_from} onClick={handler}>
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
};

export default Wrapper;
