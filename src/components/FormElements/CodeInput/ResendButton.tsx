import React, {useState} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import {toast} from 'react-toastify';


type IResendButtonProps = {
	clickHandler: () => void
}

const ResendButton: React.FC<IResendButtonProps> = ({clickHandler}) => {
	const [isActive, changeActive] = useState(true);
	const activeHandler = () => {
		//call handler
		clickHandler();

		//set active to false
		changeActive(false);

		//start timer
		setTimeout(() => changeActive(true), 30000);
	},
		unActiveHandler = () => {
			toast.error('Sorry, you can\'t send more than 1 code per 30 seconds');
		};

	return (
		<button
			type="button"
			className={cn(styles.buttons_item, {
				[styles.buttons_item_muted]: !isActive
			})}
			onClick={isActive ? activeHandler : unActiveHandler}
		>Resend</button>
	);
};

export default ResendButton;
