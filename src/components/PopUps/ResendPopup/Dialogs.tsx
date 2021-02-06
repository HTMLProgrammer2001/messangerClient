import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
		<div>
			<SearchItems items={parsed} selected={selected} toggle={toggle}/>

			{isLoading && <Loader/>}
			{hasMore && <div onClick={loadMore}>Load more</div>}
		</div>
	);
};

export default Dialogs;
