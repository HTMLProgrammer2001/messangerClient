import React, {useContext, useState} from 'react';

import styles from '../ResendPopup/styles.module.scss';

import SearchForm from '../../Common/SearchForm';
import Buttons from '../../Common/Buttons/';
import PopUpContext from '../../../utils/context/PopUpContext';
import NewGroupNamePopup from '../../PopUps/NewGroupNamePopup';
import UsersWrapper from './UsersWrapper';


const NewGroupPopup: React.FC<{}> = () => {
	const {setElement} = useContext(PopUpContext);
	const [selected, setSelected] = useState<string[]>([]);

	const onNext = () => setElement(() => <NewGroupNamePopup/>),
		toggle = (id: string) => {
			setSelected(
				selected.includes(id) ?
					selected.filter(i => i != id) :
					[...selected, id])
		},
		onFilter = ({text}: {text: string}) => {

		};

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>New group</h3>

			<div className={styles.content}>
				<SearchForm onSubmit={onFilter}/>
				<UsersWrapper toggle={toggle} selected={selected}/>
				<Buttons isValid={!!selected.length} onNext={onNext} nextText={`Next(${selected.length})`}/>
			</div>
		</div>
	);
};

export default NewGroupPopup;
