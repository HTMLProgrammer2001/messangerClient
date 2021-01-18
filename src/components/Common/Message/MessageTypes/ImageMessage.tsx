import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';

import {IMessageProps} from '../';
import styles from '../styles.module.scss';

import {sendMessageCancel} from '../../../../redux/sendMessage/slice';

import Wrapper from './Wrapper';
import PopUpContext from '../../../../utils/context/PopUpContext';
import ImagePopup from '../../../PopUps/ImagePopup';
import Uploader from '../../Uploader';


const ImageMessage: React.FC<IMessageProps> = ({message, isLoading = false, progress = 0}) => {
	const {setElement} = useContext(PopUpContext),
		dispatch = useDispatch(),
		handler = (e: React.MouseEvent) => {
			setElement(() => <ImagePopup url={message.url}/>);
			e.stopPropagation();
		};

	return (
		<Wrapper message={message}>
			<div className={styles.image_wrapper}>
				<img
					src={message.url}
					className={styles.image}
					onClick={handler}
					alt="Image"
				/>

				{
					isLoading &&
						<Uploader
							progress={progress}
							cancel={() => dispatch(sendMessageCancel(message._id))}
						/>
				}
			</div>
		</Wrapper>
	);
};

export default ImageMessage;
