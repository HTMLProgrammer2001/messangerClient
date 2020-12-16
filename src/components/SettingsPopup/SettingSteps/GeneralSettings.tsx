import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {logoutStart} from '../../../redux/logout';


const GeneralSettings: React.FC<{}> = () => {
	const dispatch = useDispatch(),
		logoutHandler = () => {
			dispatch(logoutStart());
		};

	return (
		<div className={styles.content_item}>
			<i className={`fas fa-cog ${styles.content_item_icon}`}/>

			<div className={styles.content_item_data}>
				<div>
					<div className="action">Language</div>
				</div>

				<div>
					<div className="action" onClick={logoutHandler}>Logout</div>
				</div>
			</div>
		</div>
	);
};

export default GeneralSettings;
