import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import styles from '../styles.module.scss';
import {IDialog} from '../../../../interfaces/IDialog';
import UserAvatar from '../../../Common/UserAvatar';


type IDialogProps = {
	dialog: IDialog,
	current: number,
	changeCurrent: (val: number) => void
};

export const Dialog: React.FC<IDialogProps> = ({dialog, changeCurrent, current}) => {
	const history = useHistory();

	const handler = () => {
		if(current == dialog.id)
			history?.push('/');
		else
			history?.push(`/?dlg=${dialog.nick}`);

		changeCurrent(dialog.id);
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		if(params.get('dlg') == dialog.nick)
			changeCurrent(dialog.id);
	}, []);

	return (
		<div 
			className={`${styles.dialog} ${current == dialog.id ? styles.active : ''}`}
			onClick={handler}>

			<UserAvatar name={dialog.name} avatar={dialog.avatar} size={50}/>

			<div className={styles.dialog_content}>
				<div className={styles.dialog_header}>
					<div className={styles.dialog_name}>
						{dialog.name}

						<p className={styles.dialog_last}>
							{dialog.lastMessage.text}
						</p>
					</div>

					<div className={styles.dialog_time}>
						{dialog.lastMessage.time}

						{
							dialog.unreaded &&
								<div className={styles.dialog_unreaded}>
									{dialog.unreaded}
								</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
