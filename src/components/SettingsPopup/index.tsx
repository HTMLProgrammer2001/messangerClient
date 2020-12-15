import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from './styles.module.scss';
import {RootState} from '../../redux/';
import {selectMe} from '../../redux/me/selectors';

import UserInfo from './UserInfo';
import PersonalSettings from './SettingSteps/PersonalSettings';
import NotificationSettings from './SettingSteps/NotificationSettings';
import GeneralSettings from './SettingSteps/GeneralSettings';


const mapStateToProps = (state: RootState) => ({
	user: selectMe(state)
});

const connected = connect(mapStateToProps);

type ISettingsPopupProps = ConnectedProps<typeof connected>;

const SettingsPopup: React.FC<ISettingsPopupProps> = ({user}) => (
	<div className={styles.wrapper}>
		<div className={styles.header}>
			<b>Settings</b>

			<UserInfo user={user}/>

			<div className={styles.mediaElem}>
				<i className="fas fa-camera"/>
			</div>
		</div>

		<div className={styles.content}>
			<PersonalSettings user={user}/>
			<NotificationSettings/>
			<GeneralSettings/>
		</div>
	</div>
);

export default connected(SettingsPopup);
