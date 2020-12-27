import React from 'react';
import {useSelector} from 'react-redux';

import {selectSearchUser} from '../../../../../redux/search/slice';
import {IUser} from '../../../../../interfaces/IUser';


const UserSection: React.FC<{}> = () => {
	const user = useSelector(selectSearchUser) as IUser;

	if(!user)
		return null;

	return (
		<div>
			<b>User</b>
			<div>{user.name}</div>
		</div>
	);
};

export default UserSection;
