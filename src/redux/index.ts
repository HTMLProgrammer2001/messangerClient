import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {reducer as formReducer} from 'redux-form';

//import root saga
import rootSaga from './rootSaga';

//import reducers
import app from './app/slice';
import signIn from './signIn/slice';
import logIn from './logIn/slice';
import change from './change/slice';
import editMe from './editMe/';
import me from './me/slice';
import search from './search/';
import chat from './chat/slice';
import newGroup from './newGroup/reducer';
import dialogs from './dialogs';
import users from './users';
import messages from './messages';


//create reducer
let reducer = combineReducers({
	app, me, signIn,
	logIn, dialogs, chat,
	users, newGroup, editMe,
	search, change, messages,
	form: formReducer
});

let saga = createSagaMiddleware(),
	store = createStore(reducer, composeWithDevTools(applyMiddleware(saga)));

//start saga
saga.run(rootSaga);

//export necessary variables
export type RootState = ReturnType<typeof reducer>;
export default store;

//modules that need to get actions types
type ActionCreators = {[key: string]: (...args: any) => any};
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionTypes<T extends ActionCreators> = ReturnType<PropertiesTypes<T>>;
