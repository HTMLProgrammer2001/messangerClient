import {EDIT_ME_NAME_START, EDIT_ME_NAME_ERROR, EDIT_ME_NAME_SUCCESS} from './types';
import {IErrors} from '../../../interfaces/IErrors';
import {INewNameFormData} from '../../../components/PopUps/NewNamePopUp/NewNameForm';


export const editMeNameStart = (vals: INewNameFormData) => <const>({
	type: EDIT_ME_NAME_START,
	payload: vals
});

export const editMeNameSuccess = () => <const>({
	type: EDIT_ME_NAME_SUCCESS
});

export const editMeNameError = (errors: IErrors<INewNameFormData>) => <const>({
	type: EDIT_ME_NAME_ERROR,
	payload: errors
});
