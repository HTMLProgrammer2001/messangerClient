import React from 'react';
import {reduxForm, InjectedFormProps, Field, submit} from 'redux-form';
import {Dispatch} from 'redux';

import InputElement from '../../FormElements/Input';


export type IChangeNickFormData = {
	newNick: string
};

type IChangeNickFormProps = InjectedFormProps<IChangeNickFormData>;

const ChangeNickForm: React.FC<IChangeNickFormProps> = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<Field component={InputElement} type="text" placeholder="New username"/>
	</form>
);

export default reduxForm<IChangeNickFormData>({
	form: 'changeNick',
	onChange(values: Partial<IChangeNickFormData>, dispatch: Dispatch<any>): void {
		//dispatch(submit('changeNick'));
	}
})(ChangeNickForm);
