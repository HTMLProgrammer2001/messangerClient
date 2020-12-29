import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {selectSearchCurrent} from '../../../redux/search/state/slice';
import WithChat from './WithChat';
import NoChat from './NoChat';


const DialogField: React.FC<{}> = () => {
	const current = useSelector(selectSearchCurrent);

	return (
		<div className={styles.wrapper}>
			{current ? <WithChat/> : <NoChat/>}
		</div>
	);
};

export default DialogField;
