import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';


import {RootState} from '../../redux/';
import {selectSignInState} from '../../redux/signIn/selectors';
import {signInVerify, signInCodeVerify, signInReset} from '../../redux/signIn/actions';

import styles from './styles.module.scss';
import SignInForm, {ISignInFormData} from './SignInForm';
import IsAuthenticated from '../../utils/HOC/IsAuthenticated';


//connect component to redux store
const mapStateToProps = (state: RootState) => selectSignInState(state);

const mapDispatchToProps = (dispatch: any) => ({
	signIn(verifing: boolean, vals: ISignInFormData){
		dispatch(verifing ? signInCodeVerify(vals) : signInVerify(vals));
	},
	resetSignIn(){
		dispatch(signInReset());
	}
});

const connected = connect(mapStateToProps, mapDispatchToProps);

type ISignInPageProps = ConnectedProps<typeof connected>;
export const SignInPage: React.FC<ISignInPageProps> = ({verifing, isLoading, errors, signIn, resetSignIn}) => {
	useEffect(() => {
		//change page title
		document.title = 'Messanger | Sign in';
		resetSignIn();
	}, []);

	const onSubmit = (vals: ISignInFormData) => {
		signIn(verifing, vals);
	};

	return (
		<div className={styles.wrapper}>
			<SignInForm
				onSubmit={onSubmit}
				resend={() => {}}
				cancel={resetSignIn}
				verifing={verifing}
				err={errors}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default IsAuthenticated(false)(connected(SignInPage));
