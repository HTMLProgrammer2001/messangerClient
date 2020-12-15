import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';


import {RootState} from '../../redux/';
import {selectSignInVerifing} from '../../redux/signIn/selectors';
import {signInVerify, signInCodeVerify} from '../../redux/signIn/actions';

import styles from './styles.module.scss';
import Form, {ISignInFormData} from './SignInForm';


//connect component to redux store
const mapStateToProps = (state: RootState) => ({
	verifing: selectSignInVerifing(state)
});

const mapDispatchToProps = (dispatch: any) => ({
	signIn(verifing: boolean){
		dispatch(verifing ? signInCodeVerify() : signInVerify());
	}
});

const connected = connect(mapStateToProps, mapDispatchToProps);

type ISignInPageProps = ConnectedProps<typeof connected>;

export const SignInPage: React.FC<ISignInPageProps> = (props) => {
	useEffect(() => {
		//change page title
		document.title = 'Messanger | Sign in';
	}, []);

	const onSubmit = (vals: ISignInFormData) => {
		props.signIn(props.verifing);
	};

	return (
		<div className={styles.wrapper}>
			<Form onSubmit={onSubmit} verifing={props.verifing}/>
		</div>
	);
};

export default connected(SignInPage);
