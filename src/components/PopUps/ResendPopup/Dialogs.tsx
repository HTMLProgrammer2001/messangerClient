import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {ISearchItemData} from '../../Common/SearchItems/SearchItem';
import {selectDialogsResendState, selectResendDialogs, resendLoadMore, resendLoadDialogsStart} from '../../../redux/resend/dialogs/slice';

import SearchItems from '../../Common/SearchItems';
import Loader from '../../Common/Loader';


type IDialogsProps = {
	toggle: (id: string) => void,
	selected: string[]
}

const Dialogs: React.FC<IDialogsProps> = ({toggle, selected}) => {
	//store
	const dialogs = useSelector(selectResendDialogs),
		{isLoading, hasMore} = useSelector(selectDialogsResendState),
		dispatch = useDispatch();

	useEffect(() => {
		//initial loading
		dispatch(resendLoadDialogsStart(''));
	}, []);

	//handlers
	const loadMore = () => dispatch(resendLoadMore());

	//convert to necessary format
	const parsed: ISearchItemData[] = dialogs.map(dialog => ({
		id: dialog._id,
		name: dialog.name,
		avatar: dialog.avatar
	}));

	return (
		<div className={styles.dialogs}>
			<SearchItems items={parsed} selected={selected} toggle={toggle}/>

			{isLoading && <Loader/>}
			{!isLoading && hasMore && <div onClick={loadMore} className={styles.more}>Load more</div>}
		</div>
	);
};

export default Dialogs;
