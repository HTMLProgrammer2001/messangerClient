import React from 'react';
import {Field} from 'redux-form';

import styles from '../SingInPage/styles.module.scss';
import InputElement from '../FormElements/Input';


type ICodeInputProps = {
	verifing: boolean
};

const CodeInput: React.FC<ICodeInputProps> = ({verifing}) => {
	if(!verifing)
		return null;

	return (
		<>
			<p className={styles.form_desc}>
				We have sent code to your phone. Enter this code, please.
			</p>

			<Field
				name="code"
				component={InputElement}
				type="text"
				placeholder="Code"
			/>
		</>
	);
};

export default CodeInput;
