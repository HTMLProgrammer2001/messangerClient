import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';

import styles from '../styles.module.scss';
import {IDialog} from '../../../../interfaces/IDialog';
import {RootState} from '../../../../redux';
import {selectCurrentDialog} from '../../../../redux/dialogs/selectors';
import {dialogsChangeCurrent as changeCurrent} from '../../../../redux/dialogs/actions';
import UserAvatar from '../../../Common/UserAvatar';


const mapStateToProps = (state: RootState) => ({
	current: selectCurrentDialog(state)
});

const connected = connect(mapStateToProps, {changeCurrent});

type IDialogProps = IDialog & ConnectedProps<typeof connected>;

export const Dialog: React.FC<IDialogProps> = (props) => {
	const history = useHistory();

	const handler = () => {
		if(props.current == props.id)
			history?.push('/');
		else
			history?.push(`/?dlg=${props.nick}`);

		props.changeCurrent(props.id);
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		if(params.get('dlg') == props.nick)
			props.changeCurrent(props.id);
	}, []);

	return (
		<div 
			className={`${styles.dialog} ${props.current == props.id ? styles.active : ''}`} 
			onClick={handler}>

			<UserAvatar name={props.name} avatar={props.avatar} size={50}/>

			<div className={styles.dialog_content}>
				<div className={styles.dialog_header}>
					<div className={styles.dialog_name}>
						{props.name}

						<p className={styles.dialog_last}>
							{props.lastMessage.text}
						</p>
					</div>

					<div className={styles.dialog_time}>
						{props.lastMessage.time}

						{
							props.unreaded &&
								<div className={styles.dialog_unreaded}>
									{props.unreaded}
								</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default connected(Dialog);
