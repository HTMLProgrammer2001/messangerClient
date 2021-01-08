import React, {useContext} from 'react';

import {IMessage} from '../../../../interfaces/IMessage';
import styles from '../styles.module.scss';

import Wrapper from './Wrapper';
import PopUpContext from '../../../../utils/context/PopUpContext';
import ImagePopup from '../../../PopUps/ImagePopup';


type IImageMessage = {
	message: IMessage
};

const ImageMessage: React.FC<IImageMessage> = ({message}) => {
	const {setElement} = useContext(PopUpContext),
		handler = () => {
			setElement(() => <ImagePopup url={message.url}/>);
		};

	return (
		<Wrapper message={message}>
			<img
				src={message.url}
				className={styles.image}
				onClick={handler}
				alt="Image"
			/>
		</Wrapper>
	);
};

export default ImageMessage;
