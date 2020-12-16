import React from 'react';

import styles from './styles.module.scss';
import dateToString from '../../../utils/helpers/dateToString';


type IRelativeProps = {
	time: number
};

const RelativeDate: React.FC<IRelativeProps> = ({time}) => {
	return (
		<div className={styles.relDate}>
			{dateToString(time)}
		</div>
	);
};

export default RelativeDate;
