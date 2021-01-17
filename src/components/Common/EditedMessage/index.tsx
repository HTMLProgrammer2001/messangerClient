import React from 'react';

import styles from './styles.module.scss';
import {IMessage} from '../../../interfaces/IMessage';


type IEditedMessageProps = {
	message: IMessage,
	cancel: () => void
}

const EditedMessage: React.FC<IEditedMessageProps> = ({message, cancel}) => {
	return (
		<div className={styles.edit}>
			<div className={styles.message}>
				{message.message}
			</div>

			<div
				className={styles.close}
				onClick={cancel}
			>&times;</div>
		</div>
	);
};

export default EditedMessage;
