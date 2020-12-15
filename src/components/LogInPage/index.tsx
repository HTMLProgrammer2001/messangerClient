import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';

import styles from '../SingInPage/styles.module.scss';
import LogInForm, {ILogInFormData} from './LogInForm';
import {RootState} from '../../redux/';
import {selectLogInVerifing} from '../../redux/logIn/selectors';
import {logInVerify, logInCodeVerify} from '../../redux/logIn/actions';


//connect component to redux store
const mapStateToProps = (state: RootState) => ({
	verifing: selectLogInVerifing(state)
});

type DispatchActions = typeof logInVerify | typeof logInCodeVerify;

const mapDispatchToProps = (dispatch: Dispatch<ReturnType<DispatchActions>>) => ({
	logIn(verifing: boolean){
		dispatch(verifing ? logInVerify() : logInCodeVerify());
	}
});

const connected = connect(mapStateToProps, mapDispatchToProps);
type ILogInPageProps = ConnectedProps<typeof connected>;

const LogInPage: React.FC<ILogInPageProps> = (props) => {
	useEffect(() => {
		document.title = 'Messanger | Log in';
	}, []);

	const onSubmit = (vals: ILogInFormData) => {
		console.log(vals);

		props.logIn(props.verifing);
	};

	return (
		<div className={styles.wrapper}>
			<LogInForm onSubmit={onSubmit} verifing={props.verifing}/>
		</div>
	);
};

export default connected(LogInPage);
