import React from 'react';
import {InjectedFormProps, Field, reduxForm} from 'redux-form';

import styles from './styles.module.scss';


export type ISearchDialogFormData = {
	search: string
};

type ISearchDialogFormProps = InjectedFormProps<ISearchDialogFormData>;

const SearchDialogForm: React.FC<ISearchDialogFormProps> = (props) => (
	<form onSubmit={props.handleSubmit} className={styles.form}>
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

export default reduxForm<ISearchDialogFormData>({
	form: 'searchDialog'
})(SearchDialogForm);
