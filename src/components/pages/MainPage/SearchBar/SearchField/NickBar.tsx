import React from 'react';

import styles from './styles.module.scss';
import UserSection from './Sections/UserSection';
import DialogsSection from './Sections/DialogsSection';


const NickBar: React.FC<{}> = () => {
	return (
		<div className={styles.bar}>
			<UserSection/>
			<DialogsSection/>
		</div>
	);
};

export default NickBar;
