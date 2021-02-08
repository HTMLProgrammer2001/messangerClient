import React from 'react';
import {Field, FormikProps, withFormik} from 'formik';

import FormikInput from '../FormElements/FormikInput';

export type INewGroupData = {
	text: string
};

type IOwnProps = {
	onSubmit: (vals: INewGroupData) => void,
	placeholder?: string
}

type INewGroupProps = FormikProps<INewGroupData> & IOwnProps;

const SearchForm: React.FC<INewGroupProps> = ({handleSubmit, placeholder}) => (
	<form onSubmit={handleSubmit} style={{width: '100%'}}>
		<Field
			name="text"
			type="text"
			placeholder={placeholder || "Enter username or nick"}
			component={FormikInput}
			style={{marginTop: 0}}
			required={false}
		/>
	</form>
);

export default withFormik<IOwnProps, INewGroupData>({
	mapPropsToValues: () => ({text: ''}),
	handleSubmit: (vals, formikProps) => {formikProps.props.onSubmit(vals)}
})(SearchForm);
