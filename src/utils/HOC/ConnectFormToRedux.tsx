import React, {useEffect} from 'react';
import {useFormikContext} from 'formik';


const connectFormToRedux = <T extends object>(Elem: React.ComponentType<T>) => {
	const ConnectedElem: React.FC<T & {err: any, isLoading: boolean}> = ({err, isLoading, ...props}) => {
		const formik = useFormikContext();

		//set server errors on change
		useEffect(() => {
			formik.setErrors(err);
		}, [err]);

		//set loading
		useEffect(() => {
			formik.setSubmitting(isLoading);
		}, [isLoading]);

		//return base elem
		return <Elem {...props as T}/>
	};

	//return wrapped elem
	return ConnectedElem;
};

export default connectFormToRedux;
