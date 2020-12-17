import {combineReducers} from 'redux';

import avatar from './avatar/reducer';


const editMeReducers = combineReducers({
	avatar
});

export default editMeReducers;
