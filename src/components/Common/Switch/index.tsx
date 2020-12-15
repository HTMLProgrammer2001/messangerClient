import React, {useState} from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';


export type ISwitchProps = {
	defaultState?: boolean,
	onChange: (state: boolean) => void
};

const Switch: React.FC<ISwitchProps> = ({defaultState = false, onChange}) => {
	const [state, changeState] = useState(defaultState);

	const handler = () => {
		changeState(!state);
		onChange(state);
	};

	return (
		<div
			className={classnames(styles.switch, {[styles.active]: state})}
			onClick={handler}
		>
			<div className={styles.inner}/>
		</div>
	);
};

export default Switch;
