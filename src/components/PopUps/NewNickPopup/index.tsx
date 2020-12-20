import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';
import NewNickForm, {INewNickFormData} from './NewNickForm';
import {selectMe} from '../../../redux/me/selectors';
import {selectEditMeNickState} from '../../../redux/editMe/nick/selectors';
import {editMeNickStart} from '../../../redux/editMe/nick/actions';


const NewNickPopUp: React.FC<{}> = () => {
	const {isLoading, errors} = useSelector(selectEditMeNickState),
		{nickname} = useSelector(selectMe);

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
