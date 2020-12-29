import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {selectSearchType, selectSearchHasData} from '../../../../redux/search/slice';
import {SearchTypes} from '../../../../constants/SearchTypes';

import NickBar from './NickBar';
import TextBar from './TextBar';


const SearchField: React.FC<{}> = () => {
	const type = useSelector(selectSearchType),
		hasData = useSelector(selectSearchHasData);

	if(!hasData)
		return <div className={styles.gray}>No data was found</div>;

	return type == SearchTypes.NICK ? <NickBar/> : <TextBar/>;
};

export default SearchField;
