import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../AboutPopup/styles.module.scss';
import NameForm from './NameForm';


const NewGroupNamePopup: React.FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>New group name</h3>

			<div className={styles.content}>
				<NameForm/>
			</div>
		</div>
	);
};

export default NewGroupNamePopup;
