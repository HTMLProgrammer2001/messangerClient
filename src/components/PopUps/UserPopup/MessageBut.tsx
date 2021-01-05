import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';

import styles from '../SettingsPopup/styles.module.scss';
import {searchSetCurrent} from '../../../redux/search/state/slice';
import PopUpContext from '../../../utils/context/PopUpContext';


type IMessageButProps = {
	nick: string
}

const MessageBut: React.FC<IMessageButProps> = ({nick}) => {
	const dispatch = useDispatch(),
		{setElement} = useContext(PopUpContext);

	const handler = () => {
		dispatch(searchSetCurrent(nick));
		setElement(null);
	};

	return (
		<div className={styles.mediaElem} onClick={handler}>
			<i className="fas fa-comment"/>
		</div>
	);
};

export default MessageBut;
