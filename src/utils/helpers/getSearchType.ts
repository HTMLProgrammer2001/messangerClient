import {SearchTypes} from '../../constants/SearchTypes';


const getSearchType = (text: string): SearchTypes => {
	return !text.startsWith('@') ? SearchTypes.TEXT : SearchTypes.NICK;
};

export default getSearchType;
