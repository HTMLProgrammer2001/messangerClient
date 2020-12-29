import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import styles from './styles.module.scss';
import {searchStart} from '../../../redux/search/state/slice';

import SearchForm from './SearchForm';
import Items from './SearchField';


export const Dialogs: React.FC<{}> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchStart(''));
	}, []);

	return (
		<div className={styles.wrapper}>
			<SearchForm/>

			<div className={styles.dialog_wrap}>
				<Items/>
			</div>
		</div>
	);
};

export default Dialogs;
