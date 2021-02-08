import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../ResendPopup/styles.module.scss';
import {ISearchItemData} from '../../Common/SearchItems/SearchItem';
import {selectCreateGroupUsers, selectGroupCreateUsersState, createGroupUsersStart, createGroupUsersMore} from '../../../redux/group/create/users/slice';

import SearchItems from '../../Common/SearchItems';
import Loader from '../../Common/Loader';


type IUsersWrapperProps = {
	toggle: (id: string) => void,
	selected: string[]
}

const UsersWrapper: React.FC<IUsersWrapperProps> = ({toggle, selected}) => {
	//store
	const users = useSelector(selectCreateGroupUsers),
		{isLoading, hasMore} = useSelector(selectGroupCreateUsersState),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(createGroupUsersStart(''));
	}, []);

	//handlers
	const loadMore = () => dispatch(createGroupUsersMore());

	//convert to necessary format
	const parsed: ISearchItemData[] = users.map(user => ({
		id: user._id,
		name: user.name,
		avatar: user.avatar
	}));

	return (
		<div className={styles.dialogs}>
			<SearchItems items={parsed} selected={selected} toggle={toggle}/>

			{isLoading && <Loader/>}

			{!isLoading && hasMore &&
				<div onClick={loadMore} className={styles.more}>Load more</div>
			}
		</div>
	);
};

export default UsersWrapper;
