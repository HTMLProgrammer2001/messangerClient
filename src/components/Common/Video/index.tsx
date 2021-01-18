import React, {useContext, useRef, useState} from 'react';

import styles from './styles.module.scss';
import secondsToDuration from '../../../utils/helpers/secondsToDuration';
import sizeToString from '../../../utils/helpers/sizeToString';

import PopUpContext from '../../../utils/context/PopUpContext';
import Preview from './Preview';
import VideoPopup from '../../PopUps/VideoPopup';


type IVideoProps = {
	url: string,
	name: string,
	size: number,
	isLoading?: boolean,
	progress?: number,
	cancel?: () => void
}

const VideoMessage: React.FC<IVideoProps> = ({url, size, name, isLoading = false, progress = 0, cancel}) => {
	//state
	const [dur, setDur] = useState(null),
		[isLoaded, setLoaded] = useState(false);

	//refs and context
	const video = useRef<HTMLVideoElement>(null),
		{setElement} = useContext(PopUpContext);

	const handler = (e: React.MouseEvent) => {
			if(!isLoading)
				setElement(() => <VideoPopup url={url}/>);
			else
				cancel();

			e.stopPropagation();
		},
		canPlayHandler = () => {
			setDur(video.current?.duration);
			setLoaded(true);
		};

	return (
		<div className={styles.video}>
			<Preview
				video={isLoaded && video.current}
				handler={handler}
				isLoading={isLoading}
				progress={progress}
			/>

			<div className={styles.video_info}>
				<div className={styles.video_name} onClick={handler}>{name}</div>
				<div>{secondsToDuration(dur)}</div>
				<div>{sizeToString(size)}</div>
			</div>

			<video
				src={url}
				ref={video}
				preload="metadata"
				style={{display: 'none'}}
				onCanPlay={canPlayHandler}
			/>
		</div>
	);
};

export default VideoMessage;
