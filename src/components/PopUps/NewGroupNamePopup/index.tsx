import React, {useContext} from 'react';

import styles from '../AboutPopup/styles.module.scss';
import NameForm from './NameForm';
import ClosePopUp from '../../Common/ClosePopUp';
import PopUpContext from '../../../utils/context/PopUpContext';


type INewGroupNamePopupProps = {
	create: (name: string) => void
}

const NewGroupNamePopup: React.FC<INewGroupNamePopupProps> = ({create}) => {
	const {setElement} = useContext(PopUpContext),
		handler = (vals: {text: string}) => {
			setElement(null);
			create(vals.text)
		};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h3>New group name</h3>
				<ClosePopUp/>
			</div>

			<div className={styles.content}>
				<NameForm onSubmit={handler}/>
			</div>
		</div>
	);
};

export default NewGroupNamePopup;
