import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {clearFields} from 'redux-form';

import styles from '../AboutPopup/styles.module.scss';
import NameForm from './NameForm';
import {groupCreate} from '../../redux/newGroup/actions';


const connected = connect(null, {
	groupCreate,
	clear: () => clearFields('groupName', true, true)
});

const NewGroupNamePopup: React.FC<ConnectedProps<typeof connected>> = ({groupCreate, clear}) => {
	useEffect(() => {
		clear();
	}, []);

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.header}>New group name</h3>

			<div className={styles.content}>
				<NameForm onSubmit={groupCreate}/>
			</div>
		</div>
	);
};

export default connected(NewGroupNamePopup);
