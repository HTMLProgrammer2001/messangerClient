import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {IUser} from '../../../interfaces/IUser';
import styles from './styles.module.scss';
import NewNickForm, {INewNickFormData} from './NewNickForm';
import {selectMeInfo} from '../../../redux/me/slice';
import {selectEditMeNickState, editMeNickStart} from '../../../redux/editMe/nick/slice';


const NewNickPopUp: React.FC<{}> = () => {
	const {isLoading, errors} = useSelector(selectEditMeNickState),
		{nickname} = useSelector(selectMeInfo) as IUser;

	const dispatch = useDispatch();

	const handleSubmit = (vals: INewNickFormData) => {
		dispatch(editMeNickStart(vals));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				Change nick
			</div>

			<div className="container px-1">
				<NewNickForm
					isLoading={isLoading}
					err={errors}
					handleSubmit={handleSubmit}
					defaultValue={nickname}
				/>
			</div>
		</div>
	);
};

export default NewNickPopUp;
