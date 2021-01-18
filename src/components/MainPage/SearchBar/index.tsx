import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {searchStart} from '../../../redux/search/state/slice';

import SearchForm from './SearchForm';
import Items from './SearchField';


export const SearchBar: React.FC<{isSelect: boolean}> = ({isSelect}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchStart(''));
	}, []);

	return (
		<div className={cn(styles.wrapper, {[styles.selected]: isSelect})}>
			<SearchForm/>

			<div className={styles.dialog_wrap}>
				<Items/>
			</div>
		</div>
	);
};

export default SearchBar;

