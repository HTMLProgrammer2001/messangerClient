import React, {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';

import styles from '../ResendPopup/styles.module.scss';
import {createGroupUsersStart} from '../../../redux/group/create/users/slice';
import createGroupThunk from '../../../redux/group/create/state/thunks';

import SearchForm from '../../Common/SearchForm';
import Buttons from '../../Common/Buttons/';
import PopUpContext from '../../../utils/context/PopUpContext';
import NewGroupNamePopup from '../../PopUps/NewGroupNamePopup';
import UsersWrapper from './UsersWrapper';
import ClosePopUp from '../../Common/ClosePopUp';


const NewGroupPopup: React.FC<{}> = () => {
	const {setElement} = useContext(PopUpContext),
		[selected, setSelected] = useState<string[]>([]),
		[isLoading, setLoading] = useState(false),
		dispatch = useDispatch();

	const onCreate = async (name: string) => {
			//start creating
			setLoading(true);
			const isSuccess = await dispatch(createGroupThunk(selected, name));

			//stop loading
			isSuccess ? setElement(null) : setLoading(false);
		},
		onNext = () => setElement(() => <NewGroupNamePopup create={onCreate}/>),
		toggle = (id: string) => {
			setSelected(selected.includes(id) ?
					selected.filter(i => i != id) : [...selected, id])
		},
		onFilter = ({text}: {text: string}) => dispatch(createGroupUsersStart(text));

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>
				<span>New group</span>
				<ClosePopUp/>
			</h3>

			<div className={styles.content}>
				<SearchForm onSubmit={onFilter}/>
				<UsersWrapper toggle={toggle} selected={selected}/>
				<Buttons
					isValid={selected.length > 1 && !isLoading}
					onNext={onNext}
					nextText={`Next(${selected.length})`}
				/>
			</div>
		</div>
	);
};

export default NewGroupPopup;
