import React, {useContext} from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {selectMeInfo} from '../../../redux/me/slice';
import DB from '../../../utils/helpers/DB';

import UserInfo from './UserInfo';
import PersonalSettings from './SettingSteps/PersonalSettings';
import NotificationSettings from './SettingSteps/NotificationSettings';
import GeneralSettings from './SettingSteps/GeneralSettings';
import PopUpContext from '../../../utils/context/PopUpContext';
import AvatarUploader from './AvatarUploader';


const SettingsPopup: React.FC<{}> = () => {
	const user = useSelector(selectMeInfo);
	const {setElement} = useContext(PopUpContext);

	if(!user) {
		setElement(null);
		return null;
	}

	//get settings from db
	const settings = DB.getData<Record<string, any>>('settings') || {};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<b>Settings</b>

				<UserInfo user={user}/>
				<AvatarUploader/>
			</div>

			<div className={styles.content}>
				<PersonalSettings user={user}/>
				<NotificationSettings settings={settings}/>
				<GeneralSettings/>
			</div>
		</div>
	);
};

export default SettingsPopup;
