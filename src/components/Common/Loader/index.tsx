import React from 'react';

import styles from './styles.module.scss';
import loader from '../../../assets/Logo.png';


const Loader: React.FC<{}> = () => (
	<div className={styles.wrapper}>
		<div className={styles.animContainer}>
			<span className={styles.animCircle}/>
			<img src={loader} className={styles.img} alt="Loader"/>
		</div>
	</div>
);

export default Loader;
