import React, {useState} from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react';

import styles from './styles.module.scss';


type IEmojiProps = {
	onChange: (data: IEmojiData) => void
}

const Emoji: React.FC<IEmojiProps> = ({onChange}) => {
	const [isOpen, changeOpen] = useState(false);
	const handler = (e: any, emoji: IEmojiData) => {
		onChange(emoji);
	};

	return (
		<>
			<i
				className={`far fa-smile ${styles.message_send}`}
				onClick={() => changeOpen(!isOpen)}
			/>

			{
				isOpen &&
					<div className={styles.picker}>
						<Picker onEmojiClick={handler}/>
					</div>
			}
		</>
	);
};

export default Emoji;
