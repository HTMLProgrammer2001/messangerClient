import React, {useEffect, useRef} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import Uploader from '../../Uploader';


type IPreviewProps = {
	video?: HTMLVideoElement,
	handler: (e: React.MouseEvent) => void,
	isLoading?: boolean,
	progress?: number
}

const Preview: React.FC<IPreviewProps> = ({video, handler, isLoading = false, progress = 0}) => {
	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if(!video || !canvas.current)
			return;

		const can = canvas.current;
		video.muted = true;

		video.onplay = () => {
			video.pause();

			//draw image
			setInterval(() => {
				const ctx = can.getContext('2d');
				ctx.drawImage(video, 0, 0, can.width, can.height);
			}, 100);
		};

		//play video
		video.play();
	}, [video, canvas.current]);

	return (
		<div className={styles.preview} onClick={handler}>
			<canvas ref={canvas} className={styles.preview_canvas}/>
			{
				!isLoading ?
					<i className={cn('fas fa-play', styles.preview_icon)}/>
						:
					<Uploader progress={progress} cancel={() => null}/>
			}
		</div>
	);
};

export default Preview;
