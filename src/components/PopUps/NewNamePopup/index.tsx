import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {IUser} from '../../../interfaces/IUser';
import styles from './styles.module.scss';
import NewNameForm, {INewNameFormData} from './NewNameForm';
import {selectEditMeNameState, editMeNameStart} from '../../../redux/editMe/name/slice';
import {selectMeInfo} from '../../../redux/me/slice';


const NewNamePopUp: React.FC<{}> = () => {
	const {isLoading, errors} = useSelector(selectEditMeNameState),
		{name} = useSelector(selectMeInfo) as IUser;

	const dispatch = useDispatch();

	const handleSubmit = (vals: INewNameFormData) => {
		dispatch(editMeNameStart(vals));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				Change name
			</div>

			<div className="container px-1">
				<NewNameForm
					isLoading={isLoading}
					err={errors}
					handleSubmit={handleSubmit}
					defaultValue={name}
				/>
			</div>
		</div>
	);
};

export default NewNamePopUp;
