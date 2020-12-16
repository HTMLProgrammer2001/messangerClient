import React from 'react';
import {FormikProps, Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import Logo from '../Logo';

import CodeInput from '../Common/CodeInput/';
import FormikInput from '../FormElements/FormikInput';
import connectFormToRedux from '../../utils/HOC/ConnectFormToRedux';


export type ISignInFormData = {
	name: string,
	phone: string,
	nickname: string,
	code?: string
};

type IOwnProps = {
	verifing: boolean,
	err: Object,
	onSubmit: (vals: ISignInFormData) => void,
	resend: (vals: ISignInFormData) => void,
	isLoading: boolean,
	cancel: () => void
};

type ISignInFormProps = FormikProps<ISignInFormData> & IOwnProps;

const SignInForm: React.FC<ISignInFormProps> = ({verifing, err, cancel, resend, ...formik}) => (
		<Form onSubmit={formik.handleSubmit} className={styles.form}>
			<div className={styles.form_header}>
				<Logo/>
				<button 
					className={styles.form_next} 
					disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
					type="submit"
				>Next</button>
			</div>

			<div className={styles.form_content}>
				<h6 className={styles.form_name}>Sign In</h6>

				<p className={styles.form_desc}>
					Please enter data in this field
				</p>

				{
					err && <div className="red">{(err as any)._error}</div>
				}

				<Field 
					name="name" 
					component={FormikInput}
					type="text" 
					placeholder="Name"
					disabled={verifing}
				/>

				<Field 
					name="phone" 
					component={FormikInput}
					type="text" 
					placeholder="Phone"
					disabled={verifing}
				/>

				<Field 
					name="nickname"
					component={FormikInput}
					type="text" 
					placeholder="NickName"
					disabled={verifing}
				/>

				<CodeInput verifing={verifing} resend={() => resend(formik.values)} cancel={cancel}/>
			</div>
		</Form>
);

export default withFormik<IOwnProps, ISignInFormData>({
	mapPropsToValues: () => ({name: '', phone: '', nickname: ''}),
	handleSubmit: (vals, formikBag) => formikBag.props.onSubmit(vals),
	validateOnBlur: false,
	validationSchema: Yup.object().shape({
		name: Yup.string().min(4).max(32).required(),
		phone: Yup.string().required().matches(/\+?\d{7,}/, 'Incorrect format of phone number'),
		nickname: Yup.string().min(4).max(32).required()
	})
})(connectFormToRedux<any>(SignInForm));
