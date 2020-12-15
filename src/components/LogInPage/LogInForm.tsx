import React from 'react';
import {InjectedFormProps, reduxForm, Field} from 'redux-form';

import styles from '../SingInPage/styles.module.scss';
import Logo from '../Logo';

import InputElement from '../FormElements/Input/';
import phoneValidator from '../../validators/phone';
import CodeInput from './CodeInput';


export type ILogInFormData = {
	phone: string,
	code?: string
};

type IOwnProps = {verifing: boolean};
type ILogInFormProps = InjectedFormProps<ILogInFormData, IOwnProps> & IOwnProps;

const LogInForm: React.FC<ILogInFormProps> = (props) => (
		<form onSubmit={props.handleSubmit} className={styles.form}>
			<div className={styles.form_header}>
				<Logo/>
				
				<button 
					className={styles.form_next} 
					disabled={props.pristine || props.submitting}
				>Next</button>
			</div>

			<div className={styles.form_content}>
				<h6 className={styles.form_name}>Log In</h6>

				<p className={styles.form_desc}>
					Please enter data in this field
				</p>

				{
					props.error && <div className="red">{props.error}</div>
				}

				<Field 
					name="phone" 
					component={InputElement} 
					type="text" 
					placeholder="Phone" 
					validate={phoneValidator}
				/>

				<CodeInput verifing={props.verifing}/>
			</div>
		</form>
);

export default reduxForm<ILogInFormData, IOwnProps>({
	form: 'logIn'
})(LogInForm);
