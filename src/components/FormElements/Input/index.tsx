import * as React from 'react';
import {WrappedFieldProps} from 'redux-form';

import styles from '../FormikInput/styles.module.scss';


type IElementProps = WrappedFieldProps & React.InputHTMLAttributes<HTMLInputElement>;

const InputElement: React.FC<IElementProps> = (props) => {
	const {
		type, placeholder, className, style,
		input: {value, name, onChange},
		meta: {touched, error}
	} = props;

	return (
		<>
			<div className={`${styles.input} ${className}`} style={style}>
				<input
					className={styles.input_elem}
					required
					type={type}
					value={value}
					name={name}
					onChange={onChange}/>

				<label className={styles.input_label}>
					{placeholder}
				</label>

				<div className={styles.input_line}/>
			</div>

			{touched && error && <small className="red" style={{margin: '5px'}}>{error}</small>}
		</>
	);
};

export default InputElement;
