import React from 'react';
import {Field, FormikProps, withFormik} from 'formik';
import {useSelector} from 'react-redux';
import {IEmojiData} from 'emoji-picker-react';

import styles from './styles.module.scss';
import {ISendMessage} from '../../../../../redux/sendMessage/slice';
import {MessageTypes} from '../../../../../constants/MessageTypes';

import {selectMeInfo} from '../../../../../redux/me/slice';
import {selectChatDialog} from '../../../../../redux/chat/dialog/slice';

import Emoji from './Emoji';
import ImageInput from './FileInputs/ImageInput';
import AudioInput from './FileInputs/AudioInput';
import VideoInput from './FileInputs/VideoInput';
import DocumentInput from './FileInputs/DocumentInput';


export type IMessageInputData = {
	message: string
};

type IOwnProps = {
	onSubmit(data: Partial<ISendMessage>): void
}

type IMessageInputProps = FormikProps<IMessageInputData> & IOwnProps;

const MessageInput: React.FC<IMessageInputProps> = ({handleSubmit, submitForm, values, setFieldValue}) => {
	const author = useSelector(selectMeInfo),
		dialog = useSelector(selectChatDialog);

	const keyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		//submit on Shift + Enter
		if(e.shiftKey && e.key == 'Enter') {
			submitForm();
			e.preventDefault();
		}
	};

	const emojiHandler = (emoji: IEmojiData) => {
		//add emoji to message
		setFieldValue('message', values.message + emoji.emoji);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.message_form}>
			<div style={{display: 'flex'}}>
				<div className={styles.message_wrap}>
					<Field
						component="textarea"
						name="message"
						className={styles.message_text}
						onKeyDown={keyHandler}
					/>

					<div className={styles.line}/>
				</div>

				<button className={styles.message_button}>
					<i className={`fas fa-paper-plane ${styles.message_send}`}/>
				</button>
			</div>

			<div className={styles.message_actions}>
				<Emoji onChange={emojiHandler}/>

				<ImageInput author={author} dialog={dialog}/>
				<AudioInput author={author} dialog={dialog}/>
				<DocumentInput author={author} dialog={dialog}/>
				<VideoInput author={author} dialog={dialog}/>
			</div>
		</form>
	);
};

export default withFormik<IOwnProps, IMessageInputData>({
	mapPropsToValues: () => ({message: ''}),
	handleSubmit: ({message}, formikBag) => {
		formikBag.resetForm();
		formikBag.props.onSubmit({
			message,
			type: MessageTypes.MESSAGE
		});
	}
})(MessageInput);
