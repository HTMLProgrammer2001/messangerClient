import React, {useEffect, useRef} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';


type IPreviewProps = {
	video?: HTMLVideoElement,
	handler: () => void
}

const Preview: React.FC<IPreviewProps> = ({video, handler}) => {
	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if(!video || !canvas.current)
			return;

		const can = canvas.current;

		//draw image
		const ctx = can.getContext('2d');
		ctx.drawImage(video, 0, 0, can.width, can.height, 0, 0, video.width, video.height);
	}, [video, canvas.current]);

	return (
		<div className={styles.preview} onClick={handler}>
			<canvas ref={canvas} className={styles.preview_canvas}/>
			<i className={cn('fas fa-play', styles.preview_icon)}/>
		</div>
	);
};

export default Preview;
