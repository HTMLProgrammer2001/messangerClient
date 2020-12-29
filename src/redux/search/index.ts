import {combineReducers} from 'redux';

import state from './state/slice';
import user from './users/slice';
import messages from './messages/slice';
import dialogs from './dialogs/slice';


export default combineReducers({state, user, messages, dialogs});
