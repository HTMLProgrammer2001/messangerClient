import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {selectEditMeAvatarState} from '../../../redux/editMe/avatar/selectors';
import {editMeAvatarStart} from '../../../redux/editMe/avatar/actions';


const AvatarUploader: React.FC<{}> = () => {
	const avatarState = useSelector(selectEditMeAvatarState);
	const dispatch = useDispatch();

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		//create form vals
		let formData = new FormData();
		formData.set('avatar', e.target.files[0]);

		//start uploading
		dispatch(editMeAvatarStart(formData));
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
