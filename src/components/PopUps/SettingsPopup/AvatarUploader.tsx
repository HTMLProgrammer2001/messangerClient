import React, {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {selectEditMeAvatarState} from '../../../redux/editMe/avatar/selectors';
import {editMeAvatarStart} from '../../../redux/editMe/avatar/actions';
import PopUpContext from '../../../utils/context/PopUpContext';
import CropForm from '../../Common/Crop/CropForm';


const AvatarUploader: React.FC<{}> = () => {
	//get avatar state
	const avatarState = useSelector(selectEditMeAvatarState);
	const dispatch = useDispatch();

	//get context
	const {setElement} = useContext(PopUpContext);

	const saveAvatar = (avatar: Blob) => {
		//create vals
		let formData = new FormData();
		formData.set('avatar', new File([avatar], 'avatar.png', {type: 'image/png'}));

		//start loading
		dispatch(editMeAvatarStart(formData));

		//hide popup
		setElement(null);
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let file = e.target.files[0];

		if(!file)
			return;

		const img = new Image();
		img.src = URL.createObjectURL(file);

		img.onload = () => {
			//show crop popup
			setElement(() => <CropForm img={img} onChange={saveAvatar}/>);
		};

		e.target.value = null;
	};

	return (
		<form className={styles.mediaElem}>
			<label>
				<i className={cn("fas", {
					"fa-camera": !avatarState.isLoading,
					"fa-spinner fa-spin": avatarState.isLoading,
					[styles.mediaElem_error]: avatarState.wasError
				})}/>
				<input
					type="file"
					name="avatar"
					onChange={onChangeHandler}
					disabled={avatarState.isLoading}
					hidden
				/>
			</label>
		</form>
	);
};

export default AvatarUploader;
