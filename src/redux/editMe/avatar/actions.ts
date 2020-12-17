import {EDIT_ME_AVATAR_ERROR, EDIT_ME_AVATAR_START, EDIT_ME_AVATAR_SUCCESS} from './types';


export const editMeAvatarStart = (vals: FormData) => <const>({
	type: EDIT_ME_AVATAR_START,
	payload: vals
});

export const editMeAvatarError = () => <const>({
	type: EDIT_ME_AVATAR_ERROR
});

export const editMeAvatarSuccess = () => <const>({
	type: EDIT_ME_AVATAR_SUCCESS
});
