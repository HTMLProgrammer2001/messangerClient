import React, {useContext, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from '../AboutPopup/styles.module.scss';
import SearchForm from './Elements/SearchForm';
import UsersList from './Elements/UsersList';
import Buttons from '../../Common/Buttons/';

import PopUpContext from '../../../utils/context/PopUpContext';
import NewGroupNamePopup from '../../PopUps/NewGroupNamePopup';


const NewGroupPopup: React.FC<{}> = () => {
	const groupSet = (...any) => null,
		isValid = false,
		usersStart = (...any) => null;

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

export default NewGroupPopup;
