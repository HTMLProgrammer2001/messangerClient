import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';

import styles from '../SingInPage/styles.module.scss';
import LogInForm, {ILogInFormData} from './LogInForm';
import {RootState} from '../../redux/';
import {selectLogInState} from '../../redux/logIn/selectors';
import {logInVerify, logInCodeVerify, logInReset, loginResend} from '../../redux/logIn/actions';
import IsAuthenticated from '../../utils/HOC/IsAuthenticated';


//connect component to redux store
const mapStateToProps = (state: RootState) => (selectLogInState(state));

type DispatchActions = typeof logInVerify | typeof logInCodeVerify | typeof logInReset | typeof loginResend;

const mapDispatchToProps = (dispatch: Dispatch<ReturnType<DispatchActions>>) => ({
	async logIn(verifing: boolean, vals: ILogInFormData){
		dispatch(!verifing ? logInVerify(vals) : logInCodeVerify(vals));
	},
	resetLogin(){
		dispatch(logInReset());
	},
	resendLogin(vals: ILogInFormData){
		dispatch(loginResend(vals));
	}
});

const connected = connect(mapStateToProps, mapDispatchToProps);
type ILogInPageProps = ConnectedProps<typeof connected>;

const LogInPage: React.FC<ILogInPageProps> = ({verifing, logIn, resetLogin, errors, isLoading, resendLogin}) => {
	useEffect(() => {
		document.title = 'Messanger | Log in';
		resetLogin();
	}, []);

	return (
		<div className={styles.wrapper}>
			<LogInForm
				verifing={verifing}
				cancel={resetLogin}
				resend={resendLogin}
				err={errors}
				isLoading={isLoading}
				onSubmit={(vals: ILogInFormData) => logIn(verifing, vals)}
			/>
		</div>
	);
};

export default IsAuthenticated(false)(connected(LogInPage));
