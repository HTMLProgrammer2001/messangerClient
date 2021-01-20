import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {searchStart, selectSearchText} from '../../../../redux/search/state/slice';


const SearchDialogForm: React.FC<{}> = () => {
	const [searchText, setSearchText] = useState(''),
		dispatch = useDispatch();

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(searchStart(searchText));
	};

	return (
		<form onSubmit={onSubmit} className={styles.form} autoComplete="off">
			<input
				name="search"
				type="text"
				className="input_filled"
				placeholder="Search message or nick from @"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
		</form>
	);
};

export default SearchDialogForm;
