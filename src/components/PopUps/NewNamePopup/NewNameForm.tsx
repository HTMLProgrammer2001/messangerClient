import React from 'react';
import {Field, Form, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import FormikInput from '../../FormElements/FormikInput';
import {IErrors} from '../../../interfaces/IErrors';
import connectFormToRedux from '../../../utils/HOC/ConnectFormToRedux';
import Buttons from '../../Common/Buttons';


export type INewNameFormData = {
	name: string
}

type IOwnProps = {
	defaultValue?: string,
	handleSubmit: (vals: INewNameFormData) => void,
	isLoading: boolean,
	err: IErrors<INewNameFormData>
};

type INewNameFormProps = FormikProps<INewNameFormData> & IOwnProps;
const NewNameForm: React.FC<INewNameFormProps> = ({isLoading, err, submitForm, isValid, dirty, handleSubmit}) => (
	<Form className={styles.form} noValidate onSubmit={handleSubmit} autoComplete="off">
		{
			err && <div className="red">{err._error}</div>
		}

		<Field
			component={FormikInput}
			name="name"
			type="text"
			placeholder="Enter name"
		/>

		{
			isLoading ?
				<i className="spinner spin"/> :
				<div className="py-1">
					<Buttons isValid={isValid || !dirty} onNext={submitForm}/>
				</div>
		}
	</Form>
);

export default withFormik<IOwnProps, INewNameFormData>({
	mapPropsToValues: (props) => ({name: props.defaultValue || ''}),
	validationSchema: Yup.object().shape({
		name: Yup.string().min(4).max(32)
			.matches(/^\p{Alpha}+[\s\p{Alpha}]+\p{Alpha}+$/u,
				'Name must contains only letters and start/end without spaces')
			.required()
	}),
	handleSubmit: (vals, formikBag) => formikBag.props.handleSubmit(vals)
})(connectFormToRedux<INewNameFormProps>(NewNameForm));
