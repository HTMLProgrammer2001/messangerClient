import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {SearchTypes} from '../../../../constants/SearchTypes';
import {selectSearchState, selectSearchHasData} from '../../../../redux/search/state/slice';

import NickBar from './NickBar';
import TextBar from './TextBar';
import Loader from '../../../Common/Loader';


const SearchField: React.FC<{}> = () => {
	const {type, isLoading, wasError} = useSelector(selectSearchState),
		hasData = useSelector(selectSearchHasData);

	if(wasError)
		return <div className="red">Some error occured</div>;

	if(isLoading)
		return <Loader/>;

	if(!hasData)
		return <div className={styles.gray}>No data was found</div>;

	return type == SearchTypes.NICK ? <NickBar/> : <TextBar/>;
};

export default SearchField;
