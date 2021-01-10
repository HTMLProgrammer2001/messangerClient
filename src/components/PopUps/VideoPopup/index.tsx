import React from 'react';

import styles from './styles.module.scss';


type IVideoPopupProps = {
	url: string
}

const VideoPopup: React.FC<IVideoPopupProps> = ({url}) => (
	<div className={styles.wrapper}>
		<video src={url} autoPlay={true} controls={true} className={styles.video}/>
	</div>
);

export default VideoPopup;
