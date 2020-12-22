import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from './styles.module.scss';
import {signInVerify, signInCodeVerify, signInReset, signInResend, selectSignInState} from '../../redux/signIn/slice';
import SignInForm, {ISignInFormData} from './SignInForm';
import IsAuthenticated from '../../utils/HOC/IsAuthenticated';


export const SignInPage: React.FC<{}> = () => {
	const {verifing, errors, isLoading} = useSelector(selectSignInState),
		dispatch = useDispatch();

	const {resetSignIn, signIn} = bindActionCreators({
		signIn: (vals: ISignInFormData) => verifing ? signInCodeVerify(vals) : signInVerify(vals),
		resetSignIn: signInReset,
		resendSignIn: signInResend
	}, dispatch);

	useEffect(() => {
		//change page title
		document.title = 'Messanger | Sign in';
		resetSignIn();
	}, []);

	return (
		<div className={styles.wrapper}>
			<SignInForm
				onSubmit={signIn}
				resend={signInResend}
				cancel={resetSignIn}
				verifing={verifing}
				err={errors}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default IsAuthenticated(false)(SignInPage);
