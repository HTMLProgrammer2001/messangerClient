import React, {useContext} from 'react';

import styles from './styles.module.scss';
import PopUpContext from '../../../utils/context/PopUpContext';


type IButtonsProps = {
	isValid: boolean,
	onNext: () => void,
	nextText?: string
};

const Buttons: React.FC<IButtonsProps> = ({isValid, onNext, nextText}) => {
	const {setElement} = useContext(PopUpContext);

	return (
		<div className={styles.buttonsRow}>
			<button
				type="button"
				className={styles.button}
				onClick={() => setElement(null)}
			>Cancel
			</button>

			<button
				type="button"
				className={styles.button}
				disabled={!isValid}
				onClick={onNext}
			>{nextText || 'Next'}
			</button>
		</div>
	);
};

export default Buttons;
