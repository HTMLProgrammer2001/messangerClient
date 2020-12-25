import React from 'react';
import {FormikProps, withFormik, Field} from 'formik';

import styles from './styles.module.scss';


export type ISearchDialogFormData = {
	search: string
};

type ISearchDialogFormProps = FormikProps<ISearchDialogFormData>;
const SearchDialogForm: React.FC<ISearchDialogFormProps> = ({handleSubmit}) => (
	<form onSubmit={handleSubmit} className={styles.form}>
		<Field 
			name="search" 
			component="input" 
			type="text" 
			placeholder="Search dialog"
			className="input_filled"
			required
		/>
	</form>
);

export default withFormik<{}, ISearchDialogFormData>({
	handleSubmit: (values, formikBag) => null
})(SearchDialogForm);
