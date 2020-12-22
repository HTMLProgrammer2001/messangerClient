import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import styles from '../SingInPage/styles.module.scss';
import {logInVerify, logInCodeVerify, logInReset, logInResend, selectLogInState} from '../../redux/logIn/slice';
import LogInForm, {ILogInFormData} from './LogInForm';
import IsAuthenticated from '../../utils/HOC/IsAuthenticated';


const LogInPage: React.FC<{}> = () => {
	const {verifing, isLoading, errors} = useSelector(selectLogInState);
	const dispatch = useDispatch();

	const {resetLogin, resendLogin, logIn} = bindActionCreators({
		logIn: (vals: ILogInFormData) => verifing ? logInCodeVerify(vals) : logInVerify(vals),
		resendLogin: logInResend,
		resetLogin: logInReset
	}, dispatch);

	useEffect(() => {
		document.title = 'Messanger | Log in';
		resetLogin();
	}, []);

	return (
		<div className={styles.wrapper}>
			<div>
				<LogInForm
					verifing={verifing}
					cancel={resetLogin}
					resend={resendLogin}
					err={errors}
					isLoading={isLoading}
					onSubmit={logIn}
				/>

				<Link to="/change">
					Change phone
				</Link>
			</div>
		</div>
	);
};

export default IsAuthenticated(false)(LogInPage);
