import React, {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {resendStart} from '../../../redux/resend/state/slice';
import {resendLoadDialogsStart} from '../../../redux/resend/dialogs/slice';

import Buttons from '../../Common/Buttons';
import Dialogs from './Dialogs';
import PopUpContext from '../../../utils/context/PopUpContext';
import SearchForm from '../../Common/SearchForm';


const ResendPopup: React.FC = () => {
	const dispatch = useDispatch(),
		{setElement} = useContext(PopUpContext);

	//state
	const [selected, setSelected] = useState<Array<string>>([]);

	//handlers
	const onFilter = ({text}: {text: string}) => dispatch(resendLoadDialogsStart(text)),
		toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter(i => i != id) : [...selected, id]),
		onNext = () => {
			dispatch(resendStart(selected));
			setElement(null);
		};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>Resend</div>

			<div className={cn("container px-1", styles.content)}>
				<SearchForm onSubmit={onFilter}/>
				<Dialogs toggle={toggle} selected={selected}/>

				<Buttons
					isValid={!!selected.length}
					onNext={onNext}
					nextText={`Next(${selected.length})`}
				/>
			</div>
		</div>
	);
};

export default ResendPopup;
