import React from 'react';
import {toast} from 'react-toastify';
import {v4 as uuid} from 'uuid';

import styles from '../styles.module.scss';
import {IInputProps} from './ImageInput';
import {MessageTypes} from '../../../../../../../constants/MessageTypes';


const AudioInput: React.FC<IInputProps> = ({dialog, author, send, single}) => {
	const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
		//check files count
		if(e.target.files.length > 5 && !e.target.files.length){
			toast.error('You must select from 1 to 5 audio files');
			return;
		}

		//check files size
		for(let file of e.target.files)
			if(file.size > 50 * 1024 * 1024){
				toast.error('File size must be less than 50Mb');
				return;
			}

		for(let file of e.target.files){
			//create url
			const blob = new Blob([file]),
				url = URL.createObjectURL(blob);

			//start sending
			send({
				_id: uuid(), dialog, author,
				message: file.name, size: file.size,
				time: Date.now(), type: MessageTypes.AUDIO, url, file
			});
		}

		//reset form
		e.target.form.reset();
	};

	return (
		<span>
			<label>
				<i className={`fas fa-file-audio ${styles.message_send}`}/>

				<input
					type="file"
					accept="audio/*"
					multiple={!single}
					max={5}
					onChange={handler}
					hidden={true}
				/>
			</label>
		</span>
	);
};

export default AudioInput;
