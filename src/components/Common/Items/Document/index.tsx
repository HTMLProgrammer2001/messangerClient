import React, {useEffect} from 'react';
import {toast} from 'react-toastify';
import cn from 'classnames';

import styles from './styles.module.scss';
import sizeToString from '../../../../utils/helpers/sizeToString';
import useDownload from '../../../../utils/hooks/useDownload';

import Uploader from '../../Uploader';


type IDocumentProps = {
	name: string,
	size: number,
	url: string,
	isLoading?: boolean,
	progress?: number,
	cancel?: () => void
}

const Document: React.FC<IDocumentProps> = ({name, size, url, isLoading, progress, cancel}) => {
	const fileDownload = useDownload(),
		handler = async () => {
			if(isLoading) {
				cancel();
				return ;
			}

			if(!fileDownload.isLoading)
				await fileDownload.download(url, name);
		};

	useEffect(() => {
		if(fileDownload.error)
			toast.error(fileDownload.error);
	}, [fileDownload.error]);

	return (
		<div className={styles.document}>
			{
				!isLoading ?
					<i className={cn('fas', styles.document_icon, {
						'fa-file': !fileDownload.isLoading,
						'fa-spinner fa-spin': fileDownload.isLoading
					})}/>
						:
					<div style={{position: 'relative', minWidth: '40px', minHeight: '40px'}}>
						<Uploader cancel={cancel} progress={progress} icon={true}/>
					</div>
			}

			<div className={styles.document_info} onClick={e => e.stopPropagation()}>
				<a
					href="#"
					onClick={handler}
					className={styles.document_link}
				>
					{name}
				</a>

				<div className={styles.document_size}>
					{fileDownload.isLoading && `${sizeToString(fileDownload.progress)}/`}
					{sizeToString(size)}
				</div>
			</div>
		</div>
	);
};

export default Document;
