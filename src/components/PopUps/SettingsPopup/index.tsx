import React, {useContext} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from './styles.module.scss';
import {IObject} from '../../../interfaces/IObject';
import {RootState} from '../../../redux/';
import {selectMe} from '../../../redux/me/selectors';
import DB from '../../../utils/helpers/DB';

import UserInfo from './UserInfo';
import PersonalSettings from './SettingSteps/PersonalSettings';
import NotificationSettings from './SettingSteps/NotificationSettings';
import GeneralSettings from './SettingSteps/GeneralSettings';
import PopUpContext from '../../../utils/context/PopUpContext';
import AvatarUploader from './AvatarUploader';


const mapStateToProps = (state: RootState) => ({
	user: selectMe(state)
});

const connected = connect(mapStateToProps);

type ISettingsPopupProps = ConnectedProps<typeof connected>;

const SettingsPopup: React.FC<ISettingsPopupProps> = ({user}) => {
	const {setElement} = useContext(PopUpContext);

	if(!user) {
		setElement(null);
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<b>Settings</b>

				<UserInfo user={user}/>
				<AvatarUploader/>
			</div>

			<div className={styles.content}>
				<PersonalSettings user={user}/>
				<NotificationSettings settings={DB.getData<IObject>('settings') || {}}/>
				<GeneralSettings/>
			</div>
		</div>
	);
};

export default connected(SettingsPopup);
