import React from 'react';
import cn from 'classnames';
import {toast} from 'react-toastify';

import {IDialog} from '../../../../../interfaces/IDialog';
import styles from '../../styles.module.scss';
import useApi from '../../../../../utils/hooks/useApiCall';
import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';


type IDeleteActionProps = {dialog: IDialog}

const DeleteAction: React.FC<IDeleteActionProps> = ({dialog}) => {
	const {isLoading, cancel, call} = useApi(groupActionsAPI.deleteGroup);

	const deleteHandler = async () => {
		if(isLoading)
			return cancel();

		const msg = await call(dialog._id);
		if(msg)
			toast.error(msg);
		else
			toast.success('Group was deleted');
	};

	return (
		<div>
			<i className="fas fa-trash-alt"/>

			<span
				onClick={deleteHandler}
				className={cn(styles.action, {[styles.disabled]: isLoading})}
			>
					Delete
				</span>
		</div>
	);
};

export default DeleteAction;
