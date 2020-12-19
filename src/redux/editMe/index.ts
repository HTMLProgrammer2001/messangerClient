import {combineReducers} from 'redux';

import avatar from './avatar/reducer';
import name from './name/reducer';


const editMeReducers = combineReducers({
	avatar,
	name
});

export default editMeReducers;
