import React from 'react';
import {Form, Field, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import {IErrors} from '../../../interfaces/IErrors';
import styles from '../SingInPage/styles.module.scss';
import phone from '../../../utils/validators/phone';
import code from '../../../utils/validators/code';

import Logo from '../../Logo';
import FormikInput from '../../FormElements/FormikInput';
import connectFormToRedux from '../../../utils/HOC/ConnectFormToRedux';
import ChangeCodeInputs from './ChangeCodeInputs';


export type IChangeFormData = {
	oldPhone: string,
	newPhone: string,
	oldCode?: string,
	newCode?: string
};

type IOwnProps = {
	verifing: boolean,
	isLoading: boolean,
	err: IErrors<IChangeFormData>,
	cancel: () => void,
	resend: (vals: IChangeFormData, type: string) => void,
	onSubmit: (vals: IChangeFormData) => any
};

type IChangeFormProps = FormikProps<IChangeFormData> & IOwnProps;

const ChangeForm: React.FC<IChangeFormProps> = ({resend, cancel, verifing, err, ...formik}) => (
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
			<h6 className={styles.form_name}>Change phone</h6>

			<p className={styles.form_desc}>
				Please enter data in this field
			</p>

			{
				err && <div className="red">{err._error}</div>
			}

			<Field
				name="oldPhone"
				component={FormikInput}
				type="text"
				placeholder="Old phone"
				disabled={verifing}
			/>

			<Field
				name="newPhone"
				component={FormikInput}
				type="text"
				placeholder="New phone"
				disabled={verifing}
			/>

			<ChangeCodeInputs
				verifing={verifing}
				cancel={cancel}
				resend={(type) => resend(formik.values, type)}
			/>
		</div>

		<div className={styles.links}>
			<Link to="/">Back</Link>
		</div>
	</Form>
);

export default withFormik<IOwnProps, IChangeFormData>({
	mapPropsToValues: () => ({oldPhone: '', newPhone: ''}),
	handleSubmit: (values, formikBag) => formikBag.props.onSubmit(values),
	validationSchema: Yup.object().shape({
		oldPhone: phone().required(),
		newPhone: phone().required(),
		oldCode: code(),
		newCode: code()
	})
})(connectFormToRedux<IChangeFormProps>(ChangeForm));
