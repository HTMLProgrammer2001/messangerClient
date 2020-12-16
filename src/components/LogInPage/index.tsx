import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';

import styles from '../SingInPage/styles.module.scss';
import LogInForm, {ILogInFormData} from './LogInForm';
import {RootState} from '../../redux/';
import {selectLogInState} from '../../redux/logIn/selectors';
import {logInVerify, logInCodeVerify, logInReset} from '../../redux/logIn/actions';
import IsAuthenticated from '../../utils/HOC/IsAuthenticated';


//connect component to redux store
const mapStateToProps = (state: RootState) => (selectLogInState(state));

type DispatchActions = typeof logInVerify | typeof logInCodeVerify | typeof logInReset;

const mapDispatchToProps = (dispatch: Dispatch<ReturnType<DispatchActions>>) => ({
	async logIn(verifing: boolean, vals: ILogInFormData){
		dispatch(!verifing ? logInVerify(vals) : logInCodeVerify(vals));
	},
	resetLogin(){
		dispatch(logInReset());
	}
});

const connected = connect(mapStateToProps, mapDispatchToProps);
type ILogInPageProps = ConnectedProps<typeof connected>;

const LogInPage: React.FC<ILogInPageProps> = ({verifing, logIn, resetLogin, errors, isLoading}) => {
	useEffect(() => {
		document.title = 'Messanger | Log in';
		logInReset();
	}, []);

	return (
		<div className={styles.wrapper}>
			<LogInForm
				verifing={verifing}
				cancel={resetLogin}
				resend={() => {}}
				err={errors as any}
				isLoading={isLoading}
				onSubmit={(vals: ILogInFormData) => logIn(verifing, vals)}
			/>
		</div>
	);
};

export default IsAuthenticated(false)(connected(LogInPage));
