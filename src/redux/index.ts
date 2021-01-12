import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

//import root saga
import rootSaga from './rootSaga';

//import reducers
import app from './app/slice';
import signIn from './signIn/slice';
import logIn from './logIn/slice';
import change from './change/slice';
import me from './me/slice';
import createPersonal from './createPersonal/slice';
import clear from './clear/slice';
import editMe from './editMe/';
import search from './search/';
import chat from './chat/';
import dialogs from './dialogs';
import users from './users';
import messages from './messages';
import ban from './ban/slice';
import sendMessage from './sendMessage/slice';


//create reducer
let reducer = combineReducers({
	app, me, signIn,
	logIn, dialogs, chat,
	users, editMe,
	search, change, messages,
	createPersonal, clear, ban,
	sendMessage
});

let saga = createSagaMiddleware(),
	store = createStore(reducer, composeWithDevTools(applyMiddleware(saga)));

//start saga
saga.run(rootSaga);

//export necessary variables
export type RootState = ReturnType<typeof reducer>;
export default store;
