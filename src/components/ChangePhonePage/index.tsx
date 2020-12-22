import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from '../SingInPage/styles.module.scss';
import {changeCodeVerify, changeResend, changeReset, changeVerify, selectChangeState} from '../../redux/change/slice';
import ChangeForm, {IChangeFormData} from './ChangeForm';


const ChangePage: React.FC<{}> = () => {
	const dispatch = useDispatch(),
		{errors, isLoading, verifing} = useSelector(selectChangeState);

	useEffect(() => {
		document.title = 'Messanger | Change phone';
		dispatch(changeReset());
	}, []);

	const {resend, cancel, change} = bindActionCreators({
		resend(vals: IChangeFormData, type: string){
			let phone = type == 'old' ? vals.oldPhone : vals.newPhone;
			return changeResend({phone});
		},
		cancel: changeReset,
		change: (vals: IChangeFormData) => verifing ? changeCodeVerify(vals) : changeVerify(vals)
	}, dispatch);

	return (
		<div className={styles.wrapper}>
			<ChangeForm
				verifing={verifing}
				cancel={cancel}
				resend={resend}
				err={errors}
				isLoading={isLoading}
				onSubmit={change}
			/>
		</div>
	);
};

export default ChangePage;
