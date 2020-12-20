import {combineReducers} from 'redux';

import avatar from './avatar/reducer';
import name from './name/reducer';
import nick from './nick/reducer';


const editMeReducers = combineReducers({
	avatar,
	name,
	nick
});

export default editMeReducers;
