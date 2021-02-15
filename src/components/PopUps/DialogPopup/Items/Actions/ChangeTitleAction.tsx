import React from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import useApi from '../../../../../utils/hooks/useApiCall';
import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';


type IChangeTitleActionProps = {dialog: IDialog}

const ChangeTitleAction: React.FC<IChangeTitleActionProps> = ({dialog}) => {
	const {isLoading, cancel, call} = useApi(groupActionsAPI.changeTitle);

	//handlers
	const changeHandler = () => {

	};

	return (
		<div>
			<i className="fas fa-pencil-alt"/>

			<span
				onClick={changeHandler}
				className={cn(styles.action, {[styles.disabled]: isLoading})}
			>
					Change title
				</span>
		</div>
	);
};

export default ChangeTitleAction;
