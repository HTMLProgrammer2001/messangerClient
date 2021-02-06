import {combineReducers} from 'redux';

import state from './state/slice';
import dialogs from './dialogs/slice';


export default combineReducers({
	state, dialogs
});
