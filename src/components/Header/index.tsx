import React from 'react';

import styles from './styles.module.scss';
import Menu from './Menu';


const Header: React.FC<{}> = () => (
	<div className={styles.header}>
		<div>Messanger</div>
		<Menu/>
	</div>
);

export default Header;
