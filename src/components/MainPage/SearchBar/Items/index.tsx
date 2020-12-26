import React from 'react';
import {useSelector} from 'react-redux';

import {selectSearchType} from '../../../../redux/search/slice';
import {SearchTypes} from '../../../../constants/SearchTypes';

import NickBar from './NickBar';
import TextBar from './TextBar';


const Items: React.FC<{}> = () => {
	const type = useSelector(selectSearchType);
	return type == SearchTypes.NICK ? <NickBar/> : <TextBar/>;
};

export default Items;
