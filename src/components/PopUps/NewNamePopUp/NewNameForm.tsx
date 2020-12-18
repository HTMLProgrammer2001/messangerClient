import React from 'react';
import {Field, Form, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import FormikInput from '../../FormElements/FormikInput';


export type INewNameFormData = {
	name: string
}

type IOwnProps = {};

type INewNameFormProps = FormikProps<INewNameFormData> & IOwnProps;
const NewNameForm: React.FC<INewNameFormProps> = ({}) => (
	<Form className={styles.wrapper}>
		<Field
			component={FormikInput}
			name="name"
			type="text"
		/>

		<button type="submit" className={styles.saveBut}>
			SAVE
		</button>
	</Form>
);

export default withFormik<IOwnProps, INewNameFormData>({
	mapPropsToValues: () => ({name: ''}),
	validationSchema: Yup.object().shape({
		name: Yup.string().min(4).max(32)
	}),
	handleSubmit: () => null
})(NewNameForm);
