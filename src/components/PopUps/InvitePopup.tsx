import React, {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';

import styles from './ResendPopup/styles.module.scss';
import {createGroupUsersStart} from '../../redux/group/create/users/slice';

import SearchForm from '../Common/SearchForm';
import Buttons from '../Common/Buttons/';
import PopUpContext from '../../utils/context/PopUpContext';
import UsersWrapper from './GroupPopup/UsersWrapper';
import ClosePopUp from '../Common/ClosePopUp';
import inviteThunk from '../../redux/group/invite/inviteThunk';


type IInvitePopupProps = {dialogID: string}

const InvitePopup: React.FC<IInvitePopupProps> = ({dialogID}) => {
	const {setElement} = useContext(PopUpContext),
		[selected, setSelected] = useState<string[]>([]),
		[isLoading, setLoading] = useState(false),
		dispatch = useDispatch();

	const onNext = async () => {
			//start creating
			setLoading(true);
			const isSuccess = await dispatch(inviteThunk(dialogID, selected));

			//stop loading
			isSuccess ? setElement(null) : setLoading(false);
		},
		toggle = (id: string) => {
			setSelected(selected.includes(id) ?
				selected.filter(i => i != id) : [...selected, id])
		},
		onFilter = ({text}: {text: string}) => dispatch(createGroupUsersStart(text));

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>
				<span>Invite users</span>
				<ClosePopUp/>
			</h3>

			<div className={styles.content}>
				<SearchForm onSubmit={onFilter}/>
				<UsersWrapper toggle={toggle} selected={selected}/>
				<Buttons
					isValid={selected.length && !isLoading}
					onNext={onNext}
					nextText={`Next(${selected.length})`}
				/>
			</div>
		</div>
	);
};

export default InvitePopup;
