import React, {useContext} from 'react';

import styles from './styles.module.scss';
import PopUpContext from '../../../utils/context/PopUpContext';


type IButtonsProps = {
	isValid: boolean,
	onNext: () => void
};

const Buttons: React.FC<IButtonsProps> = ({isValid, onNext}) => {
	const {setElement} = useContext(PopUpContext);

	return (
		<div className={styles.buttonsRow}>
			<button
				className={styles.button}
				onClick={() => setElement(null)}
			>Cancel
			</button>

			<button
				className={styles.button}
				disabled={!isValid}
				onClick={onNext}
			>Next
			</button>
		</div>
	);
};

export default Buttons;
