import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../NewNamePopup/styles.module.scss';
import {resendStart, selectResendState} from '../../../redux/resend/state/slice';
import {resendLoadDialogsStart} from '../../../redux/resend/dialogs/slice';

import FilterForm from './FilterForm';
import Buttons from '../../Common/Buttons';
import Dialogs from './Dialogs';


const ResendPopup: React.FC = () => {
	const {isLoading} = useSelector(selectResendState),
		dispatch = useDispatch();

	//state
	const [selected, setSelected] = useState<Array<string>>([]);

	//handlers
	const onFilter = (filter: string) => dispatch(resendLoadDialogsStart(filter)),
		onNext = () => dispatch(resendStart(selected)),
		toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter(i => i != id) : [...selected, id]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>Resend</div>

			<div className="container px-1">
				<FilterForm onFilter={onFilter}/>
				<Dialogs toggle={toggle} selected={selected}/>

				<Buttons
					isValid={!isLoading && !!selected.length}
					onNext={onNext}
					nextText={`Next(${selected.length})`}
				/>
			</div>
		</div>
	);
};

export default ResendPopup;
