import React from 'react';
import {Form, Field, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import {IErrors} from '../../../interfaces/IErrors';
import styles from '../SingInPage/styles.module.scss';
import phone from '../../../utils/validators/phone';
import code from '../../../utils/validators/code';

import Logo from '../../Logo';
import CodeInput from '../../FormElements/CodeInput/';
import FormikInput from '../../FormElements/FormikInput';
import connectFormToRedux from '../../../utils/HOC/ConnectFormToRedux';


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
	<Form noValidate className={styles.form} onSubmit={formik.handleSubmit} autoComplete="off">
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

		<div className={styles.links}>
			<Link to="/sign">Sign in</Link>
			<Link to="/change">Change phone</Link>
		</div>
	</Form>
);

export default withFormik<IOwnProps, ILogInFormData>({
	mapPropsToValues: () => ({phone: '', code: ''}),
	handleSubmit: (values, formikBag) => formikBag.props.onSubmit(values),
	validationSchema: Yup.object().shape({
		phone: phone().required(),
		code: code()
	})
})(connectFormToRedux<ILogInFormProps>(LogInForm));
