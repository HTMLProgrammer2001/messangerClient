import React from 'react';
import {FieldProps} from 'formik';

import styles from './styles.module.scss';


type IFormikInputProps = FieldProps<HTMLInputElement> & HTMLInputElement;
const FormikInput: React.FC<IFormikInputProps> = ({field, form, style, className, placeholder, disabled}) => (
	<>
		<div className={`${styles.input} ${className}`} style={style as any}>
			<input
				className={styles.input_elem}
				required
				type="text"
				disabled={disabled}
				{...field as any}
			/>

			<label className={styles.input_label}>
				{placeholder}
			</label>

			<div className={styles.input_line}/>
		</div>

		{
			form.touched && form.errors && form.touched[field.name] && form.errors[field.name] &&
				<small className="red" style={{margin: '5px'}}>{form.errors[field.name]}</small>
		}
	</>
);

export default FormikInput;
