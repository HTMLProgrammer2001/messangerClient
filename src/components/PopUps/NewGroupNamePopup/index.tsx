import React from 'react';

import styles from '../AboutPopup/styles.module.scss';
import NameForm from './NameForm';
import ClosePopUp from '../../Common/ClosePopUp';


type INewGroupNamePopupProps = {
	create: (name: string) => void
}

const NewGroupNamePopup: React.FC<INewGroupNamePopupProps> = ({create}) => (
	<div className={styles.wrapper}>
		<div className={styles.header}>
			<h3>New group name</h3>
			<ClosePopUp/>
		</div>

		<div className={styles.content}>
			<NameForm onSubmit={(vals) => create(vals.name)}/>
		</div>
	</div>
);

export default NewGroupNamePopup;
