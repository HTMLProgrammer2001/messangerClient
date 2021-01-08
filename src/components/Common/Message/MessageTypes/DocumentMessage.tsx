import React from 'react';
import cn from 'classnames';

import {IMessage} from '../../../../interfaces/IMessage';
import styles from '../styles.module.scss';

import Wrapper from './Wrapper';


type IDocumentMessageProps = {
	message: IMessage
}

const DocumentMessage: React.FC<IDocumentMessageProps> = ({message}) => (
	<Wrapper message={message}>
		<div className={styles.document}>
			<i className={cn('fas fa-file', styles.document_icon)}/>

			<div className={styles.document_info}>
				<a href="#">{message.message}</a>
			</div>
		</div>
	</Wrapper>
);

export default DocumentMessage;
