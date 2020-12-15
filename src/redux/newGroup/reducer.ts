import {GROUP_SET_USERS, GROUP_ADD_USER, GROUP_DELETE_USER, GROUP_TOGGLE_USER} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';


type INewGroupActions = InferActionTypes<typeof actionCreators>;
type INewGroupState = Array<number>;

const initialState: INewGroupState = [];

const newGroupReducer = (state: INewGroupState = initialState, action: INewGroupActions): INewGroupState => {
	switch (action.type) {
		case GROUP_SET_USERS:
			return [...action.payload];

		case GROUP_ADD_USER:
			return [...state, action.payload];

		case GROUP_DELETE_USER:
			return state.filter(id => id != action.payload);

		case GROUP_TOGGLE_USER:
			if(state.indexOf(action.payload) != -1)
				return state.filter(id => id != action.payload);
			else
				return [...state, action.payload];
	}

	return state;
};

export default newGroupReducer;
