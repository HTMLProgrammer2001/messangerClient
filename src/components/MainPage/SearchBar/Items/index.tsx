import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {selectSearchType, selectSearchHasData} from '../../../../redux/search/slice';
import {SearchTypes} from '../../../../constants/SearchTypes';

import NickBar from './NickBar';
import TextBar from './TextBar';


const Items: React.FC<{}> = () => {
	const type = useSelector(selectSearchType),
		hasData = useSelector(selectSearchHasData);

	if(!hasData)
		return <div>No data was found</div>;

	return type == SearchTypes.NICK ? <NickBar/> : <TextBar/>;
};

export default Items;
