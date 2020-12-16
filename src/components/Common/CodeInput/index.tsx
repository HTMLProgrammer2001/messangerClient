import React, {useEffect} from 'react';
import {Field, useFormikContext} from 'formik';

import styles from './styles.module.scss';
import FormikInput from '../../FormElements/FormikInput';


type ICodeInputProps = {
	verifing: boolean,
	cancel: () => void,
	resend: () => void
};

const CodeInput: React.FC<ICodeInputProps> = ({verifing, cancel, resend}) => {
	const context = useFormikContext();

	useEffect(() => {
		//clear field value on show
		context.setFieldValue('code', '');
	}, []);

	useEffect(() => {
		//revalidate and set code field untouched
		context.validateForm();
		context.setFieldTouched('code', false);
	}, [verifing]);

	if(!verifing)
		return null;

	return (
		<>
			<p className={styles.desc}>
				We have sent code to your phone. Enter this code, please.
			</p>

			<Field
				name="code"
				component={FormikInput}
				type="text"
				placeholder="Code"
			/>

			<div className={styles.buttons}>
				<button type="button" className={styles.buttons_item} onClick={cancel}>Cancel</button>
				<button type="button" className={styles.buttons_item} onClick={resend}>Resend</button>
			</div>
		</>
	);
};

export default CodeInput;
