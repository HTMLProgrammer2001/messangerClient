import React, {useContext} from 'react';

import styles from '../styles.module.scss';
import {IUser} from '../../../../interfaces/IUser';
import PopUpContext from '../../../../utils/context/PopUpContext';
import NewNickPopUp from '../../NewNickPopup';


type IPersonalInfoProps = {
	user: IUser
};

const PersonalSettings: React.FC<IPersonalInfoProps> = ({user}) => {
	const {setElement} = useContext(PopUpContext);

	const showChangeName = () => {
		setElement(() => <NewNickPopUp/>);
	};

	return (
		<div className={styles.content_item}>
			<i className={`fas fa-phone ${styles.content_item_icon}`}/>

			<div className={styles.content_item_data}>
				<div>
					<div>{user.phone}</div>
					<div className="muted small">Phone</div>
				</div>

				<div>
					<div className="additional" onClick={showChangeName}>
						{user.nickname || 'Set nick'}
					</div>

					<div className="muted small">Nick</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalSettings;
