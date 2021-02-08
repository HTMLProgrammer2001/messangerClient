import React from 'react';
import {Field, Form, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import {IErrors} from '../../../interfaces/IErrors';
import name from '../../../utils/validators/name';

import FormikInput from '../../FormElements/FormikInput';
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
const NewNameForm: React.FC<INewNameFormProps> = ({isLoading, err, submitForm, isValid, dirty, handleSubmit, isSubmitting}) => (
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
			isLoading || isSubmitting ?
				<i className="spinner spin"/> :
				<div className="py-1">
					<Buttons isValid={isValid || !dirty} onNext={submitForm}/>
				</div>
		}
	</Form>
);

export default withFormik<IOwnProps, INewNameFormData>({
	mapPropsToValues: (props) => ({name: props.defaultValue || ''}),
	validationSchema: Yup.object().shape({name: name().required()}),
	handleSubmit: (vals, formikBag) => formikBag.props.handleSubmit(vals)
})(connectFormToRedux<INewNameFormProps>(NewNameForm));
