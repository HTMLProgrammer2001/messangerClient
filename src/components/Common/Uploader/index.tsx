import React from 'react';

import styles from './styles.module.scss';


type IUploaderProps = {
	cancel: () => void,
	progress: number
}

const Uploader: React.FC<IUploaderProps> = ({cancel, progress}) => (
	<svg
		viewBox="0 0 100 100"
		className={styles.loader}
		onClick={cancel}
	>
		<circle
			className={styles.loader_circle}
			cx="50" cy="50" r="50" stroke="#fff" strokeWidth="12"
			strokeDasharray="315 315" fill="none" strokeLinecap="round"
			strokeDashoffset={(1 - progress) * 300}
		/>

		<line x1="25" y1="25" x2="75" y2="75" stroke="#fff" strokeWidth="5"/>
		<line x1="25" y1="75" x2="75" y2="25" stroke="#fff" strokeWidth="5"/>
	</svg>
);

export default Uploader;
