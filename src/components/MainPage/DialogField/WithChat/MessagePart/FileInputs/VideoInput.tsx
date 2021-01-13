import React from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {v4 as uuid} from 'uuid';

import styles from '../styles.module.scss';
import {IInputProps} from './ImageInput';
import {MessageTypes} from '../../../../../../constants/MessageTypes';
import {sendMessageStart} from '../../../../../../redux/sendMessage/slice';


const VideoInput: React.FC<IInputProps> = ({dialog, author}) => {
	const dispatch = useDispatch();

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
				time: Date.now(), type: MessageTypes.VIDEO, url
			}));
		}
	};

	return (
		<span>
			<label>
				<i className={`fas fa-video ${styles.message_send}`}/>
				<input type="file" accept="video/*" multiple max={5} onChange={handler} hidden={true}/>
			</label>
		</span>
	);
};

export default VideoInput;
