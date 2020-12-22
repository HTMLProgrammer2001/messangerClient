import React from 'react';
import {Field, Form, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import FormikInput from '../../FormElements/FormikInput';
import {IErrors} from '../../../interfaces/IErrors';
import connectFormToRedux from '../../../utils/HOC/ConnectFormToRedux';
import Buttons from '../../Common/Buttons';
import nick from '../../../utils/validators/nick';


export type INewNickFormData = {
	nickname: string
}

type IOwnProps = {
	defaultValue?: string,
	handleSubmit: (vals: INewNickFormData) => void,
	isLoading: boolean,
	err: IErrors<INewNickFormData>
};

type INewNickFormProps = FormikProps<INewNickFormData> & IOwnProps;
const NewNickForm: React.FC<INewNickFormProps> = ({isLoading, err, submitForm, isValid, dirty, handleSubmit}) => (
	<Form className={styles.form} noValidate onSubmit={handleSubmit} autoComplete="off">
		{
			err && <div className="red">{err._error}</div>
		}

		<Field
			component={FormikInput}
			name="nickname"
			type="text"
			placeholder="Enter nick"
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

export default withFormik<IOwnProps, INewNickFormData>({
	mapPropsToValues: (props) => ({nickname: props.defaultValue || ''}),
	validationSchema: Yup.object().shape({
		nickname: nick().required()
	}),
	handleSubmit: (vals, formikBag) => formikBag.props.handleSubmit(vals)
})(connectFormToRedux<INewNickFormProps>(NewNickForm));
