import React, {useContext, useRef, useState} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import secondsToDuration from '../../../utils/helpers/secondsToDuration';
import sizeToString from '../../../utils/helpers/sizeToString';

import PopUpContext from '../../../utils/context/PopUpContext';
import Preview from './Preview';


type IVideoProps = {
	url: string,
	name: string,
	size: number
}

const VideoMessage: React.FC<IVideoProps> = ({url, size, name}) => {
	//state
	const [dur, setDur] = useState(null),
		[isLoaded, setLoaded] = useState(false);

	//refs and context
	const video = useRef<HTMLVideoElement>(null),
		{setElement} = useContext(PopUpContext);

	const handler = () => {
			setElement(() => <video src={url}/>)
		},
		canPlayHandler = () => {
			setDur(video.current?.duration);
			setLoaded(true);
		};

	return (
		<div className={styles.video}>
			<Preview video={isLoaded && video.current} handler={handler}/>

			<div className={styles.video_info}>
				<div className={styles.video_name} onClick={handler}>{name}</div>
				<div>{secondsToDuration(dur)}</div>
				<div>{sizeToString(size)}</div>
			</div>

			<video
				src={url}
				hidden={true}
				ref={video}
				preload="metadata"
				onCanPlay={canPlayHandler}
			/>
		</div>
	);
};

export default VideoMessage;
