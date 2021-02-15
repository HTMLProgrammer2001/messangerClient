import React from 'react';
import {FormikProps, Field, withFormik} from 'formik';

import FormikInput from '../../FormElements/FormikInput';


export type IGroupNameFormData = {
	text: string
};

type IOwnProps = {
	onSubmit: (vals: IGroupNameFormData) => void
}

type INameFormProps = FormikProps<IGroupNameFormData> & IOwnProps;
const NameForm: React.FC<INameFormProps> = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<Field
			name="text"
			type="text"
			placeholder="Enter group name"
			component={FormikInput}
			style={{marginTop: 0}}
		/>
	</form>
);

export default withFormik<IOwnProps, IGroupNameFormData>({
	handleSubmit: (vals, bag) => bag.props.onSubmit(vals)
})(NameForm);
