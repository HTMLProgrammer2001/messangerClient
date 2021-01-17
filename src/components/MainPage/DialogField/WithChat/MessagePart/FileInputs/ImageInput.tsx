import React from 'react';
import {v4 as uuid} from 'uuid';
import {toast} from 'react-toastify';

import styles from '../styles.module.scss';
import {IDialog} from '../../../../../../interfaces/IDialog';
import {IUser} from '../../../../../../interfaces/IUser';
import {ISendMessage} from '../../../../../../redux/sendMessage/slice';
import {MessageTypes} from '../../../../../../constants/MessageTypes';


export type IInputProps = {
	author: IUser,
	dialog: IDialog,
	send: (data: ISendMessage) => void,
	single?: boolean
}

const ImageInput: React.FC<IInputProps> = ({dialog, author, send, single}) => {
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

			send({
				_id: uuid(), dialog, author,
				message: file.name, size: file.size,
				time: Date.now(), type: MessageTypes.IMAGE, url, file
			});
		}

		//reset form
		e.target.form.reset();
	};

	return (
		<span>
			<label>
				<i className={`fas fa-image ${styles.message_send}`}/>

				<input
					type="file"
					accept="image/*"
					multiple={!single}
					onChange={handler}
					hidden={true}
				/>
			</label>
		</span>
	);
};

export default ImageInput;
