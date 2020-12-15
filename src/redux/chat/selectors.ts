import {RootState} from '../';


export const selectChatState = (state: RootState) => state.chat;
export const selectChatMessages = (state: RootState) => state.chat.messages;
