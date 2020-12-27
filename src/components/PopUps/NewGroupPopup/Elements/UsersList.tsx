import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import UserItem from './UserItem';
import styles from '../styles.module.scss';

import {RootState} from '../../../../redux';
import {selectUsers} from '../../../../redux/users';
import {selectNewGroupStateUsers} from '../../../../redux/newGroup/selectors';
import {groupToggle} from '../../../../redux/newGroup/actions';


const mapStateToProps = (state: RootState) => ({
	users: selectUsers(state),
	selected: selectNewGroupStateUsers(state)
});

const connected = connect(mapStateToProps, {toggleUser: groupToggle});

type IUsersListProps = ConnectedProps<typeof connected>;

const UsersList: React.FC<IUsersListProps> = ({users, selected, toggleUser}) => (
	<div className={styles.list}>
		{
			Object.values(users).map((user) => (
				<UserItem
					key={user._id}
					user={user as any}
					active={!!~selected.indexOf(user._id)}
					toggle={toggleUser}
				/>
			))
		}
	</div>
);

export default connected(UsersList);
