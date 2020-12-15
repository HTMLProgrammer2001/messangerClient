import React from 'react';
import {reduxForm, InjectedFormProps, Field, submit} from 'redux-form';
import {Dispatch} from 'redux';

import InputElement from '../../FormElements/Input';

export type INewGroupData = {
	text: string
};

type INewGroupProps = InjectedFormProps<INewGroupData>;

const SearchForm: React.FC<INewGroupProps> = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<Field
			name="text"
			type="text"
			placeholder="Enter username or nick"
			component={InputElement}
			style={{marginTop: 0}}
		/>
	</form>
);

export default reduxForm<INewGroupData>({
	form: 'newGroupForm',
	onChange(values: Partial<INewGroupData>, dispatch: Dispatch<any>): void {
		dispatch(submit('newGroupForm'));
	}
})(SearchForm);
