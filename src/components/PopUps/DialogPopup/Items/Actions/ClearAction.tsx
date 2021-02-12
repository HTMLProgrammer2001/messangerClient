import React from 'react';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import {clearStart, selectClearState} from '../../../../../redux/clear/slice';


type IClearActionProps = {dialog: IDialog}

const ClearAction: React.FC<IClearActionProps> = ({dialog}) => {
	const dispatch = useDispatch(),
		{isLoading: clearLoading} = useSelector(selectClearState);

	//handlers
	const clearHandler = () => {
		if(!clearLoading)
			dispatch(clearStart({id: dialog._id, type: 2}));
	};

	return (
		<div>
			<i className="fas fa-list"/>

			<span
				onClick={clearHandler}
				className={cn(styles.action, {[styles.disabled]: clearLoading})}
			>
					Clear
				</span>
		</div>
	);
};

export default ClearAction;
