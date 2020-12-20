import {EDIT_ME_NICK_START, EDIT_ME_NICK_ERROR, EDIT_ME_NICK_SUCCESS} from './types';
import {IErrors} from '../../../interfaces/IErrors';
import {INewNickFormData} from '../../../components/PopUps/NewNickPopup/NewNickForm';


export const editMeNickStart = (vals: INewNickFormData) => <const>({
	type: EDIT_ME_NICK_START,
	payload: vals
});

export const editMeNickSuccess = () => <const>({
	type: EDIT_ME_NICK_SUCCESS
});

export const editMeNickError = (errors: IErrors<INewNickFormData>) => <const>({
	type: EDIT_ME_NICK_ERROR,
	payload: errors
});
