import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';
import Wrapper from './Wrapper';
import styles from '../styles.module.scss';


type IImageMessage = {
	message: IMessage
};

const ImageMessage: React.FC<IImageMessage> = ({message}) => (
	<Wrapper message={message}>
		<img src={message.url} className={styles.image} alt="Image"/>
	</Wrapper>
);

export default ImageMessage;
