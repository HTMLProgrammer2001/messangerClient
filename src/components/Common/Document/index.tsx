import React, {useEffect} from 'react';
import {toast} from 'react-toastify';
import cn from 'classnames';

import styles from './styles.module.scss';
import sizeToString from '../../../utils/helpers/sizeToString';
import useDownload from '../../../utils/hooks/useDownload';


type IDocumentProps = {
	name: string,
	size: number,
	url: string
}

const Document: React.FC<IDocumentProps> = ({name, size, url}) => {
	const {isLoading, error, download, progress} = useDownload(),
		handler = async () => {
			if(!isLoading)
				await download(url, name);
		};

	useEffect(() => {
		if(error)
			toast.error(error);
	}, [error]);

	return (
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
					{name}
				</a>

				<div className={styles.document_size}>
					{isLoading && `${sizeToString(progress)}/`}
					{sizeToString(size)}
				</div>
			</div>
		</div>
	);
};

export default Document;
