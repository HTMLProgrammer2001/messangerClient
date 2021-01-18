import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {chatDeleteStart} from '../../../redux/chat/delete/slice';
import {selectChatSelectedState} from '../../../redux/chat/selected';

import Switch from '../../Common/Switch';
import PopUpContext from '../../../utils/context/PopUpContext';
import ClosePopUp from '../../Common/ClosePopUp';


const DeleteMessagesPopup: React.FC<{}> = () => {
	const [isDelete, setDelete] = useState(false),
		selected = useSelector(selectChatSelectedState),
		{setElement} = useContext(PopUpContext),
		dispatch = useDispatch();

	const handler = () => {
		dispatch(chatDeleteStart({messages: selected, other: isDelete}));
		setElement(null);
	};

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>
				<div>Delete messages</div>
				<ClosePopUp/>
			</h3>

			<div className={styles.content}>
				<div style={{display: 'flex'}}>
					<span style={{marginRight: '.5rem'}}>Delete for other</span>
					<Switch onChange={(del) => setDelete(del)} curState={isDelete}/>
				</div>

				<div className={styles.but_row}>
					<button className={styles.but} onClick={handler}>Next</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteMessagesPopup;
