import React from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';

import InputElement from '../FormElements/Input';
import sizeBetween from '../../utils/validators/sizeBetween';


export type IGroupNameFormData = {
	name: string
};

type INameFormProps = InjectedFormProps<IGroupNameFormData>;

const nameSize = sizeBetween(4);

const NameForm: React.FC<INameFormProps> = ({handleSubmit, error, submitting}) => (
	<form onSubmit={handleSubmit}>
		<Field
			name="text"
			type="text"
			placeholder="Enter group name"
			component={InputElement}
			style={{marginTop: 0}}
			validate={[nameSize]}
		/>

		{
			error && <div className="red">{error}</div>
		}

		{
			submitting && <div>Loading</div>
		}
	</form>
);

export default reduxForm<IGroupNameFormData>({
	form: 'groupName'
})(NameForm);
