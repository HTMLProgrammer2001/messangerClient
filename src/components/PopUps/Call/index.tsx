import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {callConnected, callDisconnect, selectCallState, selectCallUser} from '../../../redux/call/slice';

import SendControl from './Controls/SendControl';
import ReceiveControl from './Controls/ReceiveControl';
import SpeakControl from './Controls/SpeakControl';


const CallPopUp: React.FC = () => {
	//get data
	const {isCalling, isInitiator, isSpeaking, stream, callWith} = useSelector(selectCallState),
		user = useSelector(selectCallUser),
		dispatch = useDispatch();

	//refs
	const videoRef = useRef<HTMLVideoElement>(null);

	//handlers
	const onCancel = () => dispatch(callDisconnect(callWith)),
		onAccept = () => dispatch(callConnected(callWith));

	useEffect(() => {
		// return () => dispatch(callDisconnect(callWith));
	}, []);

	useEffect(() => {
		if(!videoRef.current || !stream)
			return;

		videoRef.current.srcObject = stream;
	}, [stream, videoRef.current]);

	if(!isCalling && !isSpeaking)
		return null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.video_wrap}>
				{(isCalling || !stream) && <img src={user.avatar} className={styles.video_view} alt="Video avatar"/>}
				{isSpeaking && stream && <video ref={videoRef} className={styles.video_view}/>}

				<div className={styles.info}>
					<div className={styles.name}>{user.name}</div>
					{isCalling && <div className={styles.call}>Calling...</div>}
				</div>
			</div>

			{isCalling && isInitiator && <SendControl cancel={onCancel}/>}
			{isCalling && !isInitiator && <ReceiveControl cancel={onCancel} accept={onAccept}/>}
			{isSpeaking && <SpeakControl cancel={onCancel} micro={() => null} video={() => null}/>}
		</div>
	);
};

export default CallPopUp;
