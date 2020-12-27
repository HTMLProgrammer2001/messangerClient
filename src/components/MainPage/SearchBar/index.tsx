import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../../../redux/';
import styles from './styles.module.scss';
import {selectSearchState, searchStart} from '../../../redux/search/slice';

import SearchForm from './SearchForm';
import Items from './Items';


export const Dialogs: React.FC<{}> = () => {
	const search = useSelector(selectSearchState),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchStart(''));
	}, []);

	return (
		<div className={styles.wrapper}>
			<SearchForm/>

			<div className={styles.dialog_wrap}>
				{search.wasError && <div className="red">Some error occured</div>}
				{!search.wasError && search.isLoading && <div>Loading...</div>}
				{!search.wasError && !search.isLoading && <Items/>}
			</div>
		</div>
	);
}

export default Dialogs;
