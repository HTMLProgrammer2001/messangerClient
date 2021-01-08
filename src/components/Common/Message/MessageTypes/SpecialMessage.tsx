import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';
import styles from '../styles.module.scss';


type ISpecialMessage = {
	message: IMessage
};

const SpecialMessage: React.FC<ISpecialMessage> = ({message}) => (
	<div className={styles.special}>{message.message}</div>
);

export default SpecialMessage;
