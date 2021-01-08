import React, {useEffect} from 'react';
import cn from 'classnames';
import {toast} from 'react-toastify';

import {IMessage} from '../../../../interfaces/IMessage';
import styles from '../styles.module.scss';

import Wrapper from './Wrapper';
import useDownload from '../../../../utils/hooks/useDownload';
import sizeToString from '../../../../utils/helpers/sizeToString';


type IDocumentMessageProps = {
	message: IMessage
}

const DocumentMessage: React.FC<IDocumentMessageProps> = ({message}) => {
	const {isLoading, error, download, progress} = useDownload(),
		handler = async () => {
			if(!isLoading)
				await download(message.url, message.message);
		};

	useEffect(() => {
		if(error)
			toast.error(error);
	}, [error]);

	return (
		<Wrapper message={message}>
			<div className={styles.document}>
				<i className={cn('fas', styles.document_icon, {
					'fa-file': !isLoading,
					'fa-spinner fa-spin': isLoading
				})}/>

				<div className={styles.document_info}>
					<a
						href="#"
						onClick={handler}
						className={styles.document_link}
					>
						{message.message}
					</a>

					<div className={styles.document_size}>
						{isLoading && `${sizeToString(progress)}/`}
						{sizeToString(message.size)}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default DocumentMessage;
