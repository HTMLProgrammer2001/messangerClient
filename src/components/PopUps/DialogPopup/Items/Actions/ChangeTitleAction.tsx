import React, {useContext} from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import useApi from '../../../../../utils/hooks/useApiCall';
import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';
import PopUpContext from '../../../../../utils/context/PopUpContext';
import GroupNamePopup from '../../../GroupNamePopup';
import {toast} from 'react-toastify';


type IChangeTitleActionProps = { dialog: IDialog }

const ChangeTitleAction: React.FC<IChangeTitleActionProps> = ({dialog}) => {
	const {isLoading, cancel, call} = useApi(groupActionsAPI.changeTitle),
		{setElement} = useContext(PopUpContext);

	//handlers
	const onCreate = async (name: string) => {
			const msg = await call(dialog._id, name);
			msg ? toast.error(msg) : toast.success('Name changed');
		},
		changeHandler = () => {
			if(isLoading)
				return cancel();

			setElement(() => <GroupNamePopup create={onCreate} title="New group name"/>)
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
