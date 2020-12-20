import {EDIT_ME_NICK_SUCCESS, EDIT_ME_NICK_ERROR, EDIT_ME_NICK_START} from './types';
import * as actionCreators from './actions';

import {InferActionTypes} from '../../';
import {IErrors} from '../../../interfaces/IErrors';
import {INewNickFormData} from '../../../components/PopUps/NewNickPopup/NewNickForm';

//get action types
type IEditMeNickActions = InferActionTypes<typeof actionCreators>;


//reducer state type
export type IEditMeNickState = {
	isLoading: boolean,
	errors: IErrors<INewNickFormData>
};

const initialState: IEditMeNickState = {
	isLoading: false,
	errors: null
};

const editMeNickReducer = (state: IEditMeNickState = initialState, action: IEditMeNickActions) => {
	switch (action.type) {
		case EDIT_ME_NICK_START:
			return {isLoading: true, errors: null};

		case EDIT_ME_NICK_ERROR:
			return {isLoading: false, errors: action.payload};

		case EDIT_ME_NICK_SUCCESS:
			return {isLoading: false, errors: null};
	}

	return state;
};

export default editMeNickReducer;
