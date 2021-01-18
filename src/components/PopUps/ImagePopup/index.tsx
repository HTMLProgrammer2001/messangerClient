import React from 'react';

import styles from './styles.module.scss';
import ClosePopUp from '../../Common/ClosePopUp';


type IImagePopupProps = {
	url: string
}

const ImagePopup: React.FC<IImagePopupProps> = ({url}) => (
	<div className={styles.wrapper}>
		<div>
			<div className={styles.header}>
				<h3>Image</h3>
				<ClosePopUp/>
			</div>

			<img
				className={styles.img}
				src={url}
				alt="Popup image"
			/>
		</div>
	</div>
);

export default ImagePopup;
