import React, {useEffect} from 'react';
import {reduxForm, InjectedFormProps, Field, submit, reset, formValues, getFormValues} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';

import styles from './styles.module.scss';
import Emoji from './Emoji';
import {IEmojiData} from 'emoji-picker-react';


export type IMessageInputData = {
	message: string
};

type IMessageInputProps = InjectedFormProps<IMessageInputData>;

const MessageInput: React.FC<IMessageInputProps> = ({handleSubmit, change}) => {
	const dispatch = useDispatch();
	let value: any = useSelector(getFormValues('messageInput'));

	const keyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if(e.shiftKey && e.key == 'Enter')
			dispatch(submit('messageInput'));
	};

	const emojiHandler = (emoji: IEmojiData) => {
		let newValue = (value ? value.message : '') + emoji.emoji;
		dispatch(change('message', newValue));
	};

	return (
		<form onSubmit={handleSubmit} className={styles.message_form}>
			<div style={{display: 'flex'}}>
				<Field
					component="textarea"
					name="message"
					className={styles.message_text}
					onKeyDown={keyHandler}
				/>

				<button className={styles.message_button}>
					<i className={`fas fa-paper-plane ${styles.message_send}`}/>
				</button>
			</div>

			<div className={styles.message_actions}>
				<Emoji onChange={emojiHandler}/>

				<i className={`fas fa-file-audio ${styles.message_send}`}/>
				<i className={`fas fa-file ${styles.message_send}`}/>
				<i className={`fas fa-video ${styles.message_send}`}/>
			</div>
		</form>
	);
};

export default reduxForm<IMessageInputData>({
	form: 'messageInput',
	onSubmitSuccess(data: Partial<IMessageInputData>, dispatch: Dispatch){
		console.log('Submit');
		dispatch(reset('messageInput'));
	}
})(MessageInput);
