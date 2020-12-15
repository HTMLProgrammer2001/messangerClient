import React from 'react';

import styles from './styles.module.scss';
import Chat from './Chat/';
import MessagePart from './MessagePart/';

const DialogField: React.FC<{}> = () => (
	<div className={styles.wrapper}>
		<Chat/>
		<MessagePart/>
	</div>
);

export default DialogField;
