import {combineReducers} from 'redux';

import dialog from './dialog/slice';
import messages from './messages/slice';


export default combineReducers({
	dialog,
	messages
});
