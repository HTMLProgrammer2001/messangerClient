import React, {useContext} from 'react';
import cn from 'classnames';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import useApi from '../../../../../utils/hooks/useApiCall';
import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';

import PopUpContext from '../../../../../utils/context/PopUpContext';
import CropForm from '../../../../Common/Crop/CropForm';


type IChangeAvatarActionProps = {dialog: IDialog}

const ChangeAvatarAction: React.FC<IChangeAvatarActionProps> = ({dialog}) => {
	//hooks
	const dispatch = useDispatch(),
		{setElement} = useContext(PopUpContext),
		{isLoading, cancel, call} = useApi(groupActionsAPI.changeAvatar);

	//handlers
	const onImage = async (blob: Blob) => {
			const message = await call(dialog._id, blob);
			message ? toast.error(message) : toast.success('Avatar changed');
		},
		clickHandler = (e: React.MouseEvent) => {
			if(isLoading){
				cancel();
				e.preventDefault();
			}
		},
		changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files[0];

			//check file
			if(!file || !file.type.includes('image'))
				toast.error('Pick image');

			const img = new Image();
			img.src = URL.createObjectURL(file);
			img.onload = () => setElement(() => <CropForm onChange={onImage} img={img}/>);

			e.target.value = null;
		};

	return (
		<div>
			<i className="fas fa-image"/>

			<label className={cn(styles.action, {[styles.disabled]: isLoading})}>
				<span>Change avatar</span>
				<input
					type="file"
					hidden={true}
					onChange={changeHandler}
					onClick={clickHandler}
					accept="image/*"
				/>
			</label>
		</div>
	);
};

export default ChangeAvatarAction;
