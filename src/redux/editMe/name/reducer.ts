import {EDIT_ME_NAME_SUCCESS, EDIT_ME_NAME_ERROR, EDIT_ME_NAME_START} from './types';
import * as actionCreators from './actions';

import {InferActionTypes} from '../../';
import {IErrors} from '../../../interfaces/IErrors';
import {INewNameFormData} from '../../../components/PopUps/NewNamePopup/NewNameForm';

//get action types
type IEditMeNameActions = InferActionTypes<typeof actionCreators>;


//reducer state type
export type IEditMeNameState = {
	isLoading: boolean,
	errors: IErrors<INewNameFormData>
};

const initialState: IEditMeNameState = {
	isLoading: false,
	errors: null
};

const editMeNameReducer = (state: IEditMeNameState = initialState, action: IEditMeNameActions) => {
	switch (action.type) {
		case EDIT_ME_NAME_START:
			return {isLoading: true, errors: null};

		case EDIT_ME_NAME_ERROR:
			return {isLoading: false, errors: action.payload};

		case EDIT_ME_NAME_SUCCESS:
			return {isLoading: false, errors: null};
	}

	return state;
};

export default editMeNameReducer;
