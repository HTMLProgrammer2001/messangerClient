import React, {useEffect, useRef, useState} from 'react';

import styles from '../../styles.module.scss';
import cn from 'classnames';

import Line from './Line';
import secondsToDuration from '../../../../../utils/helpers/secondsToDuration';


type IAudioElemProps = {
	url: string,
	name: string,
	size: number
}

const AudioElem: React.FC<IAudioElemProps> = ({name, url, size}) => {
	//state
	const [isShown, show] = useState(false),
		[isPlay, setPlay] = useState(false),
		[value, setValue] = useState(0),
		[dur, setDur] = useState(0);

	const audio = useRef<HTMLAudioElement>(null);

	useEffect(() => () => {
		audio.current && audio.current.pause();
	}, []);

	//handlers
	const handler = async () => {
		if(!isShown && audio.current) {
			//show audio element
			show(true);
			setPlay(true);
			audio.current.play();

			return;
		}

		//toggle play
		isPlay ? audio.current.pause() : audio.current.play();
		setPlay(!isPlay);
		},
		onTimeUpdate = () => {
			//set new value
			setValue(audio.current.currentTime/audio.current.duration * 100);
		},
		onChangeTime = (val: number) => {
			if (audio.current)
				audio.current.currentTime = audio.current.duration * (val / 100);
		},
		onLoad = () => {
			//update duration
			if(audio.current)
				setDur(audio.current.duration);
		};

	//calculate left time to play
	let left = null;

	if(audio.current)
		left = secondsToDuration(dur - (audio.current ? audio.current.currentTime : 0));
	else
		left = 0;

	return (
		<div className={styles.audio}>
			<i onClick={handler} className={cn('fas', styles.audio_icon, {
				'fa-play': !isPlay,
				'fa-pause': isPlay
			})}/>

			<div className={styles.audio_info}>
				<div className={cn(styles.audio_header, {
					[styles.loaded]: isShown
				})}>
					<div className={styles.audio_name} onClick={handler}>
						{name}
					</div>

					<div className={styles.audio_time}>
						{left}
					</div>
				</div>

				{isShown && <Line onChange={onChangeTime} val={value}/>}

				<audio
					src={url}
					onTimeUpdate={onTimeUpdate}
					onCanPlay={onLoad}
					ref={audio}
				/>
			</div>
		</div>
	);
};

export default AudioElem;
