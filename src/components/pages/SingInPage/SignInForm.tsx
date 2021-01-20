import React from 'react';
import {FormikProps, Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import {IErrors} from '../../../interfaces/IErrors';
import phone from '../../../utils/validators/phone';
import nick from '../../../utils/validators/nick';
import name from '../../../utils/validators/name';

import Logo from '../../Logo';
import CodeInput from '../../FormElements/CodeInput';
import FormikInput from '../../FormElements/FormikInput';
import connectFormToRedux from '../../../utils/HOC/ConnectFormToRedux';
import {Link} from 'react-router-dom';


export type ISignInFormData = {
	name: string,
	phone: string,
	nickname: string,
	code?: string
};

type IOwnProps = {
	verifing: boolean,
	err: IErrors<ISignInFormData>,
	onSubmit: (vals: ISignInFormData) => void,
	resend: (vals: ISignInFormData) => void,
	isLoading: boolean,
	cancel: () => void
};

type ISignInFormProps = FormikProps<ISignInFormData> & IOwnProps;

const SignInForm: React.FC<ISignInFormProps> = ({verifing, err, cancel, resend, ...formik}) => (
	<Form onSubmit={formik.handleSubmit} className={styles.form} autoComplete="off">
		<div className={styles.form_header}>
			<Logo/>
			<button
				className={styles.form_next}
				disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
				type="submit"
			>Next
			</button>
		</div>

		<div className={styles.form_content}>
			<h6 className={styles.form_name}>Sign In</h6>

			<p className={styles.form_desc}>
				Please enter data in this field
			</p>

			{
				err && <div className="red">{err._error}</div>
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

		<div className={styles.links}>
			<Link to="/">Back</Link>
		</div>
	</Form>
);

export default withFormik<IOwnProps, ISignInFormData>({
	mapPropsToValues: () => ({name: '', phone: '', nickname: ''}),
	handleSubmit: (vals, formikBag) => formikBag.props.onSubmit(vals),
	validationSchema: Yup.object().shape({
		name: name().required(),
		phone: phone().required(),
		nickname: nick().required()
	})
})(connectFormToRedux<ISignInFormProps>(SignInForm));
