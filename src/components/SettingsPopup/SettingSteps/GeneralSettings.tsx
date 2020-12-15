import React from 'react';
import styles from '../styles.module.scss';


const GeneralSettings: React.FC<{}> = () => (
	<div className={styles.content_item}>
		<i className={`fas fa-cog ${styles.content_item_icon}`}/>

		<div className={styles.content_item_data}>
			<div>
				<div className="action">Language</div>
			</div>

			<div>
				<div className="action">Logout</div>
			</div>
		</div>
	</div>
);

export default GeneralSettings;
