import React from 'react';
import {Field, FormikProps, withFormik} from 'formik';

import FormikInput from '../FormElements/FormikInput';

export type INewGroupData = {
	text: string
};

type IOwnProps = {
	onSubmit: (vals: INewGroupData) => void
}

type INewGroupProps = FormikProps<INewGroupData> & IOwnProps;

const SearchForm: React.FC<INewGroupProps> = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<Field
			name="text"
			type="text"
			placeholder="Enter username or nick"
			component={FormikInput}
			style={{marginTop: 0}}
		/>
	</form>
);

export default withFormik<IOwnProps, INewGroupData>({
	mapPropsToValues: () => ({text: ''}),
	handleSubmit: (vals, formikProps) => {formikProps.props.onSubmit(vals)}
})(SearchForm);
