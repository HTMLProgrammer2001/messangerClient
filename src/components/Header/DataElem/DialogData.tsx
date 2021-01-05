import React, {useContext} from 'react';

import {IDialog} from '../../../interfaces/IDialog';
import styles from './styles.module.scss';

import PopUpContext from '../../../utils/context/PopUpContext';


type IDialogDataProps = {
	dialog: IDialog
}

const DialogData: React.FC<IDialogDataProps> = ({dialog}) => {
	const {setElement} = useContext(PopUpContext),
		handler = () => {
			setElement(() => <div>{dialog.name}</div>)
		};

	return (
		<div className={styles.wrapper} onClick={handler}>
			<div>{dialog.name}</div>
		</div>
	);
};

export default DialogData;
