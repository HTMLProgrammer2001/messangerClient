import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {IInputProps} from './ImageInput';


const AudioInput: React.FC<IInputProps> = () => {
	const dispatch = useDispatch();

	const handler = (e: React.ChangeEvent<HTMLInputElement>) => {

	};

	return (
		<span>
			<label>
				<i className={`fas fa-file-audio ${styles.message_send}`}/>
				<input type="file" accept="audio/*" multiple max={5} onChange={handler} hidden={true}/>
			</label>
		</span>
	);
};

export default AudioInput;
