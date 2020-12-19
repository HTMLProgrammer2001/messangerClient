import React, {useState} from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';


export type ISwitchProps = {
	defaultState?: boolean,
	curState?: boolean,
	onChange: (state: boolean) => void
};

const Switch: React.FC<ISwitchProps> = ({defaultState = false, onChange, curState = null}) => {
	const [state, changeState] = useState(defaultState);

	const handler = () => {
		changeState(curState != null ? !curState : state);
		onChange(curState != null ? !curState : state);
	};

	return (
		<div
			className={classnames(styles.switch, {[styles.active]: curState == null ? state : curState})}
			onClick={handler}
		>
			<div className={styles.inner}/>
		</div>
	);
};

export default Switch;
