import React, {useContext, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from '../AboutPopup/styles.module.scss';
import SearchForm from './Elements/SearchForm';
import UsersList from './Elements/UsersList';
import Buttons from '../Common/Buttons/';

import {usersStart} from '../../redux/users/actions';
import PopUpContext from '../../utils/context/PopUpContext';
import NewGroupNamePopup from '../NewGroupNamePopup';
import {RootState} from '../../redux';
import {selectNewGroupStateUsers} from '../../redux/newGroup/selectors';
import {groupSet} from '../../redux/newGroup/actions';


const mapStateToProps = (state: RootState) => ({
	isValid: selectNewGroupStateUsers(state).length >= 2
});

const connected = connect(mapStateToProps, {usersStart, groupSet});

type INewGroupProps = ConnectedProps<typeof connected>;
const NewGroupPopup: React.FC<INewGroupProps> = ({isValid, usersStart, groupSet}) => {
	useEffect(() => {
		groupSet([]);
	}, []);

	const {setElement} = useContext(PopUpContext);

	const onNext = () => {
		setElement(() => <NewGroupNamePopup/>);
	};

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>New group</h3>

			<div className={styles.content}>
				<SearchForm onSubmit={usersStart}/>
				<UsersList/>
				<Buttons isValid={isValid} onNext={onNext}/>
			</div>
		</div>
	);
};

export default connected(NewGroupPopup);
