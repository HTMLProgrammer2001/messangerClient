import React from 'react';

import styles from './styles.module.scss';
import ClosePopUp from '../../Common/ClosePopUp';


type IVideoPopupProps = {
	url: string
}

const VideoPopup: React.FC<IVideoPopupProps> = ({url}) => (
	<div className={styles.wrapper}>
		<div>
			<div className={styles.header}>
				<h3>Video</h3>
				<ClosePopUp/>
			</div>

			<video src={url} autoPlay={true} controls={true} className={styles.video}/>
		</div>
	</div>
);

export default VideoPopup;
