import React, {useState} from 'react';

import styles from '../styles.module.scss';
import Switch from '../../../Common/Switch';
import DB from '../../../../utils/helpers/DB';


type INotificationSettingsProps = {
	settings: Record<string, any>
}

const NotificationSettings: React.FC<INotificationSettingsProps> = ({settings}) => {
	const [curSettings, setCurSettings] = useState(settings);

	const onChange = (field: string, val: boolean) => {
		setCurSettings((curSettings) => {
			const newData = {...curSettings, [field]: val};

			//change data
			DB.setData('settings', newData);
			return newData;
		});
	};

	return (
		<div className={styles.content_item}>
			<i className={`fas fa-bell ${styles.content_item_icon}`}/>

			<div className={styles.content_item_data}>
				<div className={styles.switcher}>
					<div>Push notification</div>

					<Switch
						onChange={onChange.bind(null, 'push')}
						curState={!!curSettings['push']}
					/>
				</div>

				<div className={styles.switcher}>
					<div>Sound</div>

					<Switch
						onChange={onChange.bind(null, 'sound')}
						curState={!!curSettings['sound']}
					/>
				</div>

				<div className={styles.switcher}>
					<div>Message preview</div>

					<Switch
						onChange={onChange.bind(null, 'preview')}
						curState={!!curSettings['preview']}
					/>
				</div>
			</div>
		</div>
	);
};

export default NotificationSettings;
