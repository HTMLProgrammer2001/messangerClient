import React from 'react';
import {withFormik, Field, FormikProps} from 'formik';

import styles from './styles.module.scss';
import Emoji from './Emoji';
import {IEmojiData} from 'emoji-picker-react';


export type IMessageInputData = {
	message: string
};

type IMessageInputProps = FormikProps<IMessageInputData>;

const MessageInput: React.FC<IMessageInputProps> = ({handleSubmit, submitForm, values, setFieldValue}) => {
	const keyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		//submit on Shift + Enter
		if(e.shiftKey && e.key == 'Enter')
			submitForm();
	};

	const emojiHandler = (emoji: IEmojiData) => {
		//add emoji to message
		setFieldValue('message', values.message + emoji.emoji);
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

export default withFormik<{}, IMessageInputData>({
	mapPropsToValues: () => ({message: ''}),
	handleSubmit: (values, formikBag) => {
		formikBag.resetForm();
		console.log(values);
	}
})(MessageInput);
