import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';

import {IMessageProps} from '../';
import styles from '../styles.module.scss';

import {sendMessageCancel} from '../../../../redux/sendMessage/slice';

import Wrapper from './Wrapper';
import PopUpContext from '../../../../utils/context/PopUpContext';
import ImagePopup from '../../../PopUps/ImagePopup';


const ImageMessage: React.FC<IMessageProps> = ({message, isLoading = false, progress = 0}) => {
	const {setElement} = useContext(PopUpContext),
		dispatch = useDispatch(),
		handler = () => setElement(() => <ImagePopup url={message.url}/>);

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
					<svg
						width="60px"
						height="60px"
						viewBox="0 0 100 100"
						className={styles.loader}
						onClick={() => dispatch(sendMessageCancel(message._id))}
					>
						<circle
							className={styles.loader_circle}
							cx="50" cy="50" r="50" stroke="#fff" strokeWidth="12"
							strokeDasharray="315 315" fill="none" strokeLinecap="round"
							strokeDashoffset={(1 - progress) * 300}
						/>

						<line x1="25" y1="25" x2="75" y2="75" stroke="#fff" strokeWidth="5"/>
						<line x1="25" y1="75" x2="75" y2="25" stroke="#fff" strokeWidth="5"/>
					</svg>
				}
			</div>
		</Wrapper>
	);
};

export default ImageMessage;
