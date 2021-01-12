import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {toast} from 'react-toastify';

import styles from '../styles.module.scss';
import {selectChatDialog} from '../../../../../../redux/chat/dialog/slice';
import {selectMeInfo} from '../../../../../../redux/me/slice';
import {sendMessageStart} from '../../../../../../redux/sendMessage/slice';
import {MessageTypes} from '../../../../../../constants/MessageTypes';


const ImageInput: React.FC = () => {
	const dispatch = useDispatch(),
		dialog = useSelector(selectChatDialog),
		author = useSelector(selectMeInfo);

	const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
		//check files count
		if(e.target.files.length > 5 || e.target.files.length == 0) {
			toast.error('You can select from 1 to 5 files by once');
			return;
		}

		//send selected files
		for(let file of e.target.files){
			//create url
			const blob = new Blob([file]),
				url = URL.createObjectURL(blob);

			dispatch(sendMessageStart({
				_id: uuid(), dialog, author,
				message: file.name, size: file.size,
				time: Date.now(), type: MessageTypes.IMAGE, url
			}));
		}
	};

	return (
		<span>
			<label>
				<i className={`fas fa-image ${styles.message_send}`}/>
				<input type="file" accept="image/*" multiple onChange={handler} hidden={true}/>
			</label>
		</span>
	);
};

export default ImageInput;
