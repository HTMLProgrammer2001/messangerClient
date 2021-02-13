import React from 'react';

import DialogsSection from './Sections/DialogsSection';
import MessagesSection from './Sections/MessagesSection';
import styles from './styles.module.scss';


const TextBar: React.FC<{}> = () => {
	return (
		<div className={styles.bar}>
			<DialogsSection/>
			<MessagesSection/>
		</div>
	);
};

export default TextBar;
