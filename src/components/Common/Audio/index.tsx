import React, {useEffect, useRef, useState} from 'react';

import styles from './styles.module.scss';
import cn from 'classnames';

import Line from './Line';
import secondsToDuration from '../../../utils/helpers/secondsToDuration';
import Volume from './Volume';
import Uploader from '../Uploader';


type IAudioProps = {
	url: string,
	name: string,
	size: number,
	isLoading?: boolean,
	progress?: number,
	cancel?: () => void
}

const Audio: React.FC<IAudioProps> = ({name, url, progress, isLoading, cancel}) => {
	//state
	const [isShown, show] = useState(false),
		[isPlay, setPlay] = useState(false),
		[value, setValue] = useState(0),
		[volume, setVolume] = useState(100),
		[dur, setDur] = useState(null);

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
			await audio.current.play();

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
		onChangeVolume = (val: number) => {
			//change volume of music
			if(audio.current) {
				audio.current.volume = val / 100;
				setVolume(val);
			}
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
			{
				!isLoading ?
					<i onClick={handler} className={cn('fas', styles.audio_icon, {
						'fa-play': !isPlay,
						'fa-pause': isPlay
					})}/>
						:
					<div style={{position: 'relative', minWidth: '40px'}}>
						<Uploader cancel={cancel} progress={progress} icon={true}/>
					</div>
			}

			<div className={styles.audio_info}>
				<div className={cn(styles.audio_header, {
					[styles.loaded]: isShown
				})}>
					<div className={styles.audio_name} onClick={handler}>
						{name}
					</div>
				</div>

				{isShown && <Line onChange={onChangeTime} val={value}/>}

				<audio
					src={url}
					onTimeUpdate={onTimeUpdate}
					onCanPlay={onLoad}
					onEnded={() => setPlay(false)}
					ref={audio}
				/>
			</div>

			<div className={styles.audio_control}>
				{isShown && <Volume val={volume} onChange={onChangeVolume}/>}
				{left}
			</div>
		</div>
	);
};

export default Audio;
