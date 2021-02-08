import {ThunkDispatch, ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {toast} from 'react-toastify';

import {RootState} from '../../index';
import {selectChatSelectedState} from '../../chat/selected';
import {selectChatDialogState} from '../../chat/dialog/slice';
import {usersAddMany} from '../../users';
import {messagesAddMany} from '../../messages';
import {dialogsAddMany} from '../../dialogs';
import {chatMessagesAdd} from '../../chat/messages/slice';
import {searchChange} from '../../search/dialogs/slice';
import {chatSelectedClear} from '../../chat/selected';

import messagesAPI from '../../../utils/api/messageActionsAPI';
import normalizeMessages from '../../../utils/normalizers/messagesNormalize';


export type IResendThunk = ThunkAction<Promise<boolean>, RootState, unknown, Action<any>>

const resendThunk = (to: string[]): IResendThunk =>
	async (dispatch: ThunkDispatch<{}, {}, any>, getState) => {
		try {
			//get data from store
			const messages = selectChatSelectedState(getState()),
				{dialog} = selectChatDialogState(getState());

			//make api call
			const resp = await messagesAPI.resendMessages(messages, to);

			//normalize
			const {entities} = normalizeMessages(resp.data.messages);

			//update store
			dispatch(usersAddMany(entities.users));
			dispatch(messagesAddMany(entities.messages));
			dispatch(dialogsAddMany(entities.dialogs));

			if (entities.dialogs[dialog])
				dispatch(chatMessagesAdd({message: entities.dialogs[dialog].lastMessage as any, first: true}));

			for (let msg of resp.data.messages)
				dispatch(searchChange(msg.dialog._id));

			dispatch(chatSelectedClear());

			//show success message
			toast.success('Messages was resent');
			return true;
		} catch (e) {
			toast.error(e.response?.data.message || e.message);
			return false;
		}
	};

export default resendThunk;

