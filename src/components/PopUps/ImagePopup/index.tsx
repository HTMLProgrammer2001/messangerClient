import React from 'react';

import styles from './styles.module.scss';
import useAdaptive from '../../../utils/hooks/useAdaptive';

import ClosePopUp from '../../Common/ClosePopUp';


type IImagePopupProps = {
	url: string
}

const ImagePopup: React.FC<IImagePopupProps> = ({url}) => {
	const {width, ref} = useAdaptive();

	return (
		<div className={styles.wrapper}>
			<div className={styles.wr} style={{width: `${width}px`}}>
				<div className={styles.header}>
					<h3>Image</h3>
					<ClosePopUp/>
				</div>

				<img
					className={styles.img}
					src={url}
					alt="Popup image"
					ref={ref}
				/>
			</div>
		</div>
	);
};

export default ImagePopup;
