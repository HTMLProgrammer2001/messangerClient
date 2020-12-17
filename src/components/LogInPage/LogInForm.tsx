import React from 'react';
import {Form, Field, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {IErrors} from '../../interfaces/IErrors';
import styles from '../SingInPage/styles.module.scss';

import Logo from '../Logo';
import CodeInput from '../Common/CodeInput/';
import FormikInput from '../FormElements/FormikInput';
import connectFormToRedux from '../../utils/HOC/ConnectFormToRedux';


export type ILogInFormData = {
	phone: string,
	code?: string
};

type IOwnProps = {
	verifing: boolean,
	isLoading: boolean,
	err: IErrors<ILogInFormData>,
	cancel: () => void,
	resend: (vals: ILogInFormData) => void,
	onSubmit: (vals: ILogInFormData) => any
};

type ILogInFormProps = FormikProps<ILogInFormData> & IOwnProps;

const LogInForm: React.FC<ILogInFormProps> = ({resend, cancel, verifing, err, ...formik}) => (
	<Form noValidate className={styles.form} onSubmit={formik.handleSubmit}>
		<div className={styles.form_header}>
			<Logo/>

			<button
				className={styles.form_next}
				disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
				type="submit"
			>Next
			</button>
		</div>

		<div className={styles.form_content}>
			<h6 className={styles.form_name}>Log In</h6>

			<p className={styles.form_desc}>
				Please enter data in this field
			</p>

			{
				err && <div className="red">{err._error}</div>
			}

			<Field
				name="phone"
				component={FormikInput}
				type="text"
				placeholder="Phone"
				disabled={verifing}
			/>

			<CodeInput
				verifing={verifing}
				cancel={cancel}
				resend={() => resend(formik.values)}
			/>
		</div>
	</Form>
);

export default withFormik<IOwnProps, ILogInFormData>({
	mapPropsToValues: () => ({phone: '', code: ''}),
	handleSubmit: (values, formikBag) => formikBag.props.onSubmit(values),
	validationSchema: Yup.object().shape({
		phone: Yup.string().required().matches(/\+?\d{7,}/, 'Incorrect format of phone number'),
		code: Yup.string().length(8).matches(/^\d+$/, 'Incorrect code')
	})
})(connectFormToRedux<ILogInFormProps>(LogInForm));
