import React from 'react';
import {InjectedFormProps, reduxForm, Field} from 'redux-form';

import styles from './styles.module.scss';
import Logo from '../Logo';

import InputElement from '../FormElements/Input/';
import phoneValidator from '../../utils/validators/phone';
import sizeBetween from '../../utils/validators/sizeBetween';
import CodeInput from '../Common/CodeInput/';


export type ISignInFormData = {
	name: string,
	phone: string,
	nick: string,
	code?: string
};

type IOwnProps = {verifing: boolean};
type ISignInFormProps = InjectedFormProps<ISignInFormData, IOwnProps> & IOwnProps;

const size = sizeBetween(3, 25);

const SignInForm: React.FC<ISignInFormProps> = (props) => (
		<form onSubmit={props.handleSubmit} className={styles.form}>
			<div className={styles.form_header}>
				<Logo/>
				<button 
					className={styles.form_next} 
					disabled={props.pristine || props.submitting}
				>Next</button>
			</div>

			<div className={styles.form_content}>
				<h6 className={styles.form_name}>Sign In</h6>

				<p className={styles.form_desc}>
					Please enter data in this field
				</p>

				{
					props.error && <div className="red">{props.error}</div>
				}

				<Field 
					name="name" 
					component={InputElement} 
					type="text" 
					placeholder="Name"
					validate={size}
				/>

				<Field 
					name="phone" 
					component={InputElement} 
					type="text" 
					placeholder="Phone" 
					validate={phoneValidator}
				/>

				<Field 
					name="nick" 
					component={InputElement} 
					type="text" 
					placeholder="NickName"
					validate={size}
				/>

				<CodeInput verifing={props.verifing}/>
			</div>
		</form>
);

export default reduxForm<ISignInFormData, IOwnProps>({
	form: 'signIn'
})(SignInForm);
