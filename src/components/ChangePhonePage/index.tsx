import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../SingInPage/styles.module.scss';
import {changeCodeVerify, changeResend, changeReset, changeVerify} from '../../redux/change/actions';
import {selectChangeState} from '../../redux/change/selectors';
import ChangeForm, {IChangeFormData} from './ChangeForm';


const ChangePage: React.FC<{}> = () => {
	const dispatch = useDispatch(),
		{errors, isLoading, verifing} = useSelector(selectChangeState);

	useEffect(() => {
		document.title = 'Messanger | Change phone';
		dispatch(changeReset());
	}, []);

	const onSubmit = (vals: IChangeFormData) => {
		dispatch(!verifing ? changeVerify(vals) : changeCodeVerify(vals));
	};

	const onResend = (vals: IChangeFormData, type: string) => {
		if(type == 'old')
			dispatch(changeResend({phone: vals.oldPhone}));
		else
			dispatch(changeResend({phone: vals.newPhone}));
	};

	const onCancel = () => {
		dispatch(changeReset());
	};

	return (
		<div className={styles.wrapper}>
			<ChangeForm
				verifing={verifing}
				cancel={onCancel}
				resend={onResend}
				err={errors}
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default ChangePage;
