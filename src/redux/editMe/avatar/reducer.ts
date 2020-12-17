import {EDIT_ME_AVATAR_SUCCESS, EDIT_ME_AVATAR_ERROR, EDIT_ME_AVATAR_START} from './types';
import * as actionCreators from './actions';

import {InferActionTypes} from '../../';

//get action types
type IEditMeAvatarActions = InferActionTypes<typeof actionCreators>;


//reducer state type
export type IEditMeAvatarState = {
	isLoading: boolean,
	wasError: boolean
};

const initialState: IEditMeAvatarState = {
	isLoading: false,
	wasError: false
};

const editMeAvatarReducer = (state: IEditMeAvatarState = initialState, action: IEditMeAvatarActions) => {
	switch (action.type) {
		case EDIT_ME_AVATAR_START:
			return {isLoading: true, wasError: false};

		case EDIT_ME_AVATAR_ERROR:
			return {isLoading: false, wasError: true};

		case EDIT_ME_AVATAR_SUCCESS:
			return {isLoading: false, wasError: false};
	}

	return state;
};

export default editMeAvatarReducer;
