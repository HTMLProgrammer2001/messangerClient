import React, {useEffect} from 'react';
import {Field, useFormikContext} from 'formik';

import styles from '../../FormElements/CodeInput/styles.module.scss';

import FormikInput from '../../FormElements/FormikInput';
import ResendButton from '../../FormElements/CodeInput/ResendButton';


type IChangeCodeInputs = {
	verifing: boolean,
	cancel: () => void,
	resend: (type: string) => void
}

const ChangeCodeInputs: React.FC<IChangeCodeInputs> = ({verifing, resend, cancel}) => {
	const formik = useFormikContext();

	useEffect(() => {
		//clear field value on show
		formik.setFieldValue('oldCode', '');
		formik.setFieldValue('newCode', '');
	}, []);

	useEffect(() => {
		//revalidate and set code field untouched
		formik.validateForm();
		formik.setFieldTouched('oldCode', false);
		formik.setFieldTouched('newCode', false);
	}, [verifing]);

	if (!verifing)
		return null;

	return (
		<>
			<p className={styles.desc}>
				We have sent codes to your phones. Enter this codes, please.
			</p>

			<div>
				<Field
					name="oldCode"
					component={FormikInput}
					type="text"
					placeholder="Code from old phone"
				/>

				<ResendButton clickHandler={() => resend('old')}/>
			</div>

			<div>
				<Field
					name="newCode"
					component={FormikInput}
					type="text"
					placeholder="Code from new phone"
				/>

				<ResendButton clickHandler={() => resend('new')}/>
			</div>

			<div className={styles.buttons}>
				<button type="button" className={styles.buttons_item} onClick={cancel}>Cancel</button>
			</div>
		</>
	);
};

export default ChangeCodeInputs;
