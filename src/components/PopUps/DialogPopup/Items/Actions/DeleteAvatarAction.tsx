import React from 'react';
import cn from 'classnames';
import {toast} from 'react-toastify';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import useApi from '../../../../../utils/hooks/useApiCall';
import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';


type IDeleteAvatarActionProps = {dialog: IDialog}

const DeleteAvatarAction: React.FC<IDeleteAvatarActionProps> = ({dialog}) => {
	const {isLoading, cancel, call} = useApi(groupActionsAPI.deleteAvatar);

	//handlers
	const deleteHandler = async () => {
		if(isLoading)
			return cancel();

		const msg = await call(dialog._id);
		msg ? toast.error(msg) : toast.success('Avatar deleted');
	};

	return (
		<div>
			<i className="fas fa-eraser"/>

			<span
				onClick={deleteHandler}
				className={cn(styles.action, {[styles.disabled]: isLoading})}
			>
					Delete avatar
				</span>
		</div>
	);
};

export default DeleteAvatarAction;
