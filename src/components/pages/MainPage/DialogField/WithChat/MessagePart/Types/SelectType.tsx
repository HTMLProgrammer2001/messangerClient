import React, {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {ParticipantsTypes} from '../../../../../../../constants/ParticipantTypes';
import {selectChatSelectedCount, selectChatSelectedForCurrent, chatSelectedClear, selectChatSelectedState} from '../../../../../../../redux/chat/selected';
import {selectChatDialog} from '../../../../../../../redux/chat/dialog/slice';
import {chatDeleteStart} from '../../../../../../../redux/chat/delete/slice';
import {chatEditSetMessage} from '../../../../../../../redux/chat/edit/slice';

import PopUpContext from '../../../../../../../utils/context/PopUpContext';
import DeleteMessagesPopup from '../../../../../../PopUps/DeleteMessages';
import ResendPopup from '../../../../../../PopUps/ResendPopup';


const SelectType: React.FC<{}> = () => {
	//select state
	const count = useSelector(selectChatSelectedCount),
		selected = useSelector(selectChatSelectedState),
		isCurrent = useSelector(selectChatSelectedForCurrent),
		{myRole, isActive} = useSelector(selectChatDialog);

	//get data from hooks
	const {setElement} = useContext(PopUpContext);
	const dispatch = useDispatch();

	//handlers
	const deleteHandler = () => {
			if ((isCurrent || myRole <= ParticipantsTypes.ADMIN) && isActive)
				setElement(() => <DeleteMessagesPopup/>);
			else
				dispatch(chatDeleteStart({messages: selected, other: false}));
		},
		clearSelect = () => dispatch(chatSelectedClear()),
		editHandler = () => dispatch(chatEditSetMessage(selected[0])),
		resendHandler = () => setElement(() => <ResendPopup/>);

	return (
		<div className={styles.user_row}>
			<button className={styles.user_but} onClick={resendHandler}>Resend</button>

			<button
				className={styles.user_but}
				disabled={count != 1 || !isCurrent}
				onClick={editHandler}
			>Edit
			</button>

			<button className={styles.user_but} onClick={deleteHandler}>Delete({count})</button>
			<button className={styles.user_but} onClick={clearSelect}>Cancel</button>
		</div>
	);
};

export default SelectType;
