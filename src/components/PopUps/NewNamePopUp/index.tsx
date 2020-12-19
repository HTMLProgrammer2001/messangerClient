import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';
import NewNameForm, {INewNameFormData} from './NewNameForm';
import {selectEditMeNameState} from '../../../redux/editMe/name/selectors';
import {editMeNameStart} from '../../../redux/editMe/name/actions';
import {selectMe} from '../../../redux/me/selectors';


const NewNamePopUp: React.FC<{}> = () => {
	const {isLoading, errors} = useSelector(selectEditMeNameState),
		{name} = useSelector(selectMe);

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
