import React from 'react';
import {FormikProps, Field, withFormik} from 'formik';

import FormikInput from '../../FormElements/FormikInput';


export type IGroupNameFormData = {
	name: string
};

type INameFormProps = FormikProps<IGroupNameFormData>;
const NameForm: React.FC<INameFormProps> = ({handleSubmit, isSubmitting, errors}) => (
	<form onSubmit={handleSubmit}>
		<Field
			name="text"
			type="text"
			placeholder="Enter group name"
			component={FormikInput}
			style={{marginTop: 0}}
		/>

		{errors && <div className="red">{errors}</div>}
		{isSubmitting && <div>Loading</div>}
	</form>
);

export default withFormik<{}, IGroupNameFormData>({
	handleSubmit: (vals) => console.log(vals)
})(NameForm);
