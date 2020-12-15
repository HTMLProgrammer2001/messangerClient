import React, {useState} from 'react';
import {IUser} from '../../../interfaces/IUser';
import styles from '../styles.module.scss';
import ChangeNickForm, {IChangeNickFormData} from './ChangeNickForm';


type IPersonalInfoProps = {
	user: IUser
};

const PersonalSettings: React.FC<IPersonalInfoProps> = ({user}) => {
	const [nickMode, changeNickMode] = useState(true);

	const onSubmit = (vals: IChangeNickFormData) => {
		changeNickMode(!nickMode);
		console.log(vals);
	};

	return (
		<div className={styles.content_item}>
			<i className={`fas fa-phone ${styles.content_item_icon}`}/>

			<div className={styles.content_item_data}>
				<div>
					<div>+380666876892</div>
					<div className="muted small">Phone</div>
				</div>

				<div>
					{
						nickMode ?
							<div className="additional" onClick={() => changeNickMode(!nickMode)}>
								{user.nick || 'Set username'}
							</div>
							:
							<ChangeNickForm onSubmit={onSubmit}/>
					}

					<div className="muted small">Username</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalSettings;
