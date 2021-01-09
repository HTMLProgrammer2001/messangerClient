import React from 'react';

import styles from './styles.module.scss';


type IImagePopupProps = {
	url: string
}

const ImagePopup: React.FC<IImagePopupProps> = ({url}) => (
	<div className={styles.wrapper}>
		<img
			className={styles.img}
			src={url}
			alt="Popup image"
		/>
	</div>
);

export default ImagePopup;
