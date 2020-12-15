import React from 'react';

import styles from './styles.module.scss';

import Dialogs from './Dialogs/';
import DialogField from './DialogField/';
import Header from '../Header/';


const MainPage: React.FC<{}> = () => (
	<div className="container">
		<Header/>

		<div className={styles.wrapper}>
			<Dialogs/>
			<DialogField/>
		</div>
	</div>
);

export default MainPage;
