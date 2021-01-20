import React, {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {
	selectChatSelectedCount,
	selectChatSelectedForCurrent,
	chatSelectedClear,
	selectChatSelectedState
} from '../../../../../../../redux/chat/selected';
import {chatDeleteStart} from '../../../../../../../redux/chat/delete/slice';
import {chatEditSetMessage} from '../../../../../../../redux/chat/edit/slice';
import PopUpContext from '../../../../../../../utils/context/PopUpContext';
import DeleteMessagesPopup from '../../../../../../PopUps/DeleteMessages';


const SelectType: React.FC<{}> = () => {
	//select state
	const count = useSelector(selectChatSelectedCount),
		selected = useSelector(selectChatSelectedState),
		isCurrent = useSelector(selectChatSelectedForCurrent);

	//get data from hooks
	const {setElement} = useContext(PopUpContext);
	const dispatch = useDispatch();

	//handlers
	const deleteHandler = () => {
		if(isCurrent)
			setElement(() => <DeleteMessagesPopup/>);
		else
			dispatch(chatDeleteStart({messages: selected, other: false}));
	},
	clearSelect = () => dispatch(chatSelectedClear()),
	editHandler = () => dispatch(chatEditSetMessage(selected[0]));

	return (
		<div className={styles.user_row}>
			<button className={styles.user_but}>Resend</button>

			<button
				className={styles.user_but}
				disabled={count != 1 || !isCurrent}
				onClick={editHandler}
			>Edit</button>

			<button className={styles.user_but} onClick={deleteHandler}>Delete({count})</button>
			<button className={styles.user_but} onClick={clearSelect}>Cancel</button>
		</div>
	);
};

export default SelectType;
