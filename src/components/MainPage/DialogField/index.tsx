import React from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {selectSearchCurrent} from '../../../redux/search/state/slice';
import WithChat from './WithChat';
import NoChat from './NoChat';


const DialogField: React.FC<{isSelect: boolean}> = ({isSelect}) => {
	const current = useSelector(selectSearchCurrent);

	return (
		<div className={cn(styles.wrapper, {[styles.selected]: isSelect})}>
			{current ? <WithChat/> : <NoChat/>}
		</div>
	);
};

export default DialogField;
