import {combineReducers} from 'redux';

import avatar from './avatar/slice';
import name from './name/slice';
import nick from './nick/slice';


const editMeReducers = combineReducers({
	avatar,
	name,
	nick
});

export default editMeReducers;
