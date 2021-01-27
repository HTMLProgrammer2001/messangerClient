import React, {useCallback} from 'react';
import {Field, FormikProps, withFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {IEmojiData} from 'emoji-picker-react';
import AutosizeTextarea from 'react-textarea-autosize';

import styles from './styles.module.scss';
import {ISendMessage} from '../../../../../../redux/sendMessage/slice';
import {MessageTypes} from '../../../../../../constants/MessageTypes';

import {selectMeInfo} from '../../../../../../redux/me/slice';
import {selectChatDialog} from '../../../../../../redux/chat/dialog/slice';
import throttle from '../../../../../../utils/helpers/throttle';
import {wsSendDialogStatus} from '../../../../../../redux/ws/dialog/status';
import {DialogStatus} from '../../../../../../constants/DialogStatus';

import Emoji from './Emoji';
import ImageInput from './FileInputs/ImageInput';
import AudioInput from './FileInputs/AudioInput';
import VideoInput from './FileInputs/VideoInput';
import DocumentInput from './FileInputs/DocumentInput';


export type IMessageInputData = {
	message: string
};

type IOwnProps = {
	onSubmit(data: Partial<ISendMessage>): void,
	defaultMessage?: string,
	single?: boolean
}

type IMessageInputProps = FormikProps<IMessageInputData> & IOwnProps;

const MessageInput: React.FC<IMessageInputProps> = (props) => {
	const {handleSubmit, submitForm, values, setFieldValue, onSubmit, single = false} = props;

	const author = useSelector(selectMeInfo),
		dialog = useSelector(selectChatDialog),
		dispatch = useDispatch();

	const sendHandler = useCallback(throttle(() => {
		dispatch(wsSendDialogStatus({dialog: dialog._id, status: DialogStatus.MESSAGE}));
	}, 1000), []);

	const keyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		//submit on Shift + Enter
		if(e.shiftKey && e.key == 'Enter') {
			submitForm();
			e.preventDefault();
		}

		sendHandler();
	};

	const emojiHandler = (emoji: IEmojiData) => {
		//add emoji to message
		setFieldValue('message', (values.message || '') + emoji.emoji);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.message_form}>
			<div style={{display: 'flex'}}>
				<div className={styles.message_wrap}>
					<Field
						name="message"
						validate={(val: string) => !val?.length ? 'No value' : undefined}
						render={({field}) => (
							<AutosizeTextarea
								className={styles.message_text}
								onKeyDown={keyHandler}
								minRows="3"
								maxRows="10"
								wrap="hard"
								{...field}
							/>
						)}
					/>

					<div className={styles.line}/>
				</div>

				<button className={styles.message_button}>
					<i className={`fas fa-paper-plane ${styles.message_send}`}/>
				</button>
			</div>

			<div className={styles.message_actions}>
				<Emoji onChange={emojiHandler}/>

				<ImageInput author={author} dialog={dialog} send={onSubmit} single={single}/>
				<AudioInput author={author} dialog={dialog} send={onSubmit} single={single}/>
				<DocumentInput author={author} dialog={dialog} send={onSubmit} single={single}/>
				<VideoInput author={author} dialog={dialog} send={onSubmit} single={single}/>
			</div>
		</form>
	);
};

export default withFormik<IOwnProps, IMessageInputData>({
	mapPropsToValues: (props) => ({message: props.defaultMessage}),
	handleSubmit: ({message}, formikBag) => {
		formikBag.setFieldValue('message', '');
		formikBag.props.onSubmit({message, type: MessageTypes.MESSAGE});
	}
})(MessageInput);
