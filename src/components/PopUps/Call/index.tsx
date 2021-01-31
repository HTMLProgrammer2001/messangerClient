import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {callConnected, callDisconnect, selectCallState, selectCallUser} from '../../../redux/call/slice';
import PeerService from '../../../utils/peer';

import SendControl from './Controls/SendControl';
import ReceiveControl from './Controls/ReceiveControl';
import SpeakControl from './Controls/SpeakControl';


const CallPopUp: React.FC = () => {
	//get data
	const {isCalling, isInitiator, isSpeaking, callWith} = useSelector(selectCallState),
		user = useSelector(selectCallUser),
		dispatch = useDispatch();

	//state
	const [isPlay, setPlay] = useState(false),
		[isAudioPlay, setAudioPlay] = useState(true),
		[isVideoPlay, setVideoPlay] = useState(true);

	//refs
	const videoRef = useRef<HTMLVideoElement>(null),
		audioRef = useRef<HTMLAudioElement>(null);

	//handlers
	const onCancel = () => dispatch(callDisconnect(callWith)),
		onAccept = () => dispatch(callConnected(callWith)),
		onAudio = () => {
			PeerService.changeAudio(!isAudioPlay);
			setAudioPlay(!isAudioPlay);
		},
		onVideo = () => {
			PeerService.changeVideo(!isVideoPlay);
			setVideoPlay(!isVideoPlay);
		};

	useEffect(() => {
		PeerService.setHandler((stream: MediaStream) => {
			if (!isSpeaking || !videoRef.current)
				return;

			//start play
			videoRef.current.srcObject = stream;
			videoRef.current.addEventListener('loadedmetadata', async () => {
				await videoRef.current.play();
				setPlay(true);
			});
		});
	}, []);

	if (!isCalling && !isSpeaking)
		return null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.video_wrap}>
				{isCalling && <img src={user.avatar} className={styles.video_view} alt="Video avatar"/>}
				{isSpeaking && <video ref={videoRef} className={styles.video_view}/>}

				<div className={cn(styles.info, {[styles.speak]: isPlay})}>
					<div className={styles.name}>{user.name}</div>
					{isCalling && <div className={styles.call}>Calling...</div>}
					{isSpeaking && !isPlay && <div className={styles.call}>Connecting...</div>}
				</div>
			</div>

			{isCalling && isInitiator && <SendControl cancel={onCancel}/>}
			{isCalling && !isInitiator && <ReceiveControl cancel={onCancel} accept={onAccept}/>}
			{isSpeaking &&
				<SpeakControl
					cancel={onCancel}
					micro={onAudio}
					video={onVideo}
					isMicro={isAudioPlay}
					isVideo={isVideoPlay}
				/>
			}
		</div>
	);
};

export default CallPopUp;
