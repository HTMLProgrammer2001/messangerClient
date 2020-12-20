import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {reducer as formReducer} from 'redux-form';

//import root saga
import rootSaga from './rootSaga';

//import reducers
import app from './app/reducer';
import signIn from './signIn/reducer';
import logIn from './logIn/reducer';
import dialogs from './dialogs/reducer';
import me from './me/reducer';
import chat from './chat/reducer';
import users from './users/reducer';
import newGroup from './newGroup/reducer';
import change from './change/reducer';
import editMe from './editMe/';


//create reducer
let reducer = combineReducers({
	app, me, signIn,
	logIn, dialogs, chat,
	users, newGroup, editMe,
	change,
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

export type PropType<T, K extends keyof T> = T[K];
