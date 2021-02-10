import React, {useContext} from 'react';

import {IDialog} from '../../../interfaces/IDialog';
import styles from './styles.module.scss';

import PopUpContext from '../../../utils/context/PopUpContext';
import DialogPopup from '../../PopUps/DialogPopup';


type IDialogDataProps = {
	dialog: IDialog
}

const DialogData: React.FC<IDialogDataProps> = ({dialog}) => {
	const {setElement} = useContext(PopUpContext),
		handler = () => setElement(() => <DialogPopup dialog={dialog}/>);

	return (
		<div className={styles.wrapper} onClick={handler}>
			<div className={styles.data}>
				<div>{dialog.name}</div>
				<div className={styles.lastSeen}>{dialog.partCount} participant(s)</div>
			</div>
		</div>
	);
};

export default DialogData;
