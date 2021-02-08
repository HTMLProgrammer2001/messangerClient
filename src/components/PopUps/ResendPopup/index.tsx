import React, {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {resendLoadDialogsStart} from '../../../redux/resend/dialogs/slice';
import resendThunk from '../../../redux/resend/state/thunks';

import Buttons from '../../Common/Buttons';
import Dialogs from './Dialogs';
import PopUpContext from '../../../utils/context/PopUpContext';
import SearchForm from '../../Common/SearchForm';


const ResendPopup: React.FC = () => {
	const dispatch = useDispatch(),
		{setElement} = useContext(PopUpContext);

	//state
	const [selected, setSelected] = useState<Array<string>>([]),
		[isLoading, setLoading] = useState(false);

	//handlers
	const onFilter = ({text}: {text: string}) => dispatch(resendLoadDialogsStart(text)),
		toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter(i => i != id) : [...selected, id]),
		onNext = async () => {
			setLoading(true);

			const isSuccess = await dispatch(resendThunk(selected));
			isSuccess ? setElement(null) : setLoading(false);
		};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>Resend</div>

			<div className={cn("container px-1", styles.content)}>
				<SearchForm onSubmit={onFilter}/>
				<Dialogs toggle={toggle} selected={selected}/>

				<Buttons
					isValid={!!selected.length && !isLoading}
					onNext={onNext}
					nextText={`Next(${selected.length})`}
				/>
			</div>
		</div>
	);
};

export default ResendPopup;
