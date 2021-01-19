import React from 'react';

import styles from './styles.module.scss';
import useAdaptive from '../../../utils/hooks/useAdaptive';

import ClosePopUp from '../../Common/ClosePopUp';


type IVideoPopupProps = {
	url: string
}

const VideoPopup: React.FC<IVideoPopupProps> = ({url}) => {
	const {width, ref} = useAdaptive();
	console.log(width);

	return (
		<div className={styles.wrapper}>
			<div className={styles.wr} style={{width: `${width}px`}}>
				<div className={styles.header}>
					<h3>Video</h3>
					<ClosePopUp/>
				</div>

				<video
					src={url}
					autoPlay={true}
					controls={true}
					className={styles.video}
					ref={ref}
				/>
			</div>
		</div>
	);
};

export default VideoPopup;
