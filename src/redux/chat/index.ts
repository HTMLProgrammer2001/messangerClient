import {combineReducers} from 'redux';

import dialog from './dialog/slice';
import messages from './messages/slice';
import selected from './selected';
import deleteRed from './delete/slice';


export default combineReducers({
	dialog,
	messages,
	selected,
	delete: deleteRed
});
