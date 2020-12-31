import React from 'react';

import styles from './styles.module.scss';
import Menu from './Menu';
import DataElem from './DataElem';


const Header: React.FC<{}> = () => (
	<div className={styles.header}>
		<div className={styles.name}>
			<div>Messenger</div>
		</div>

		<DataElem/>
		<Menu/>
	</div>
);

export default Header;
