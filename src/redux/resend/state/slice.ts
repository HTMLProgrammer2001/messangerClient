import {createAction} from '@reduxjs/toolkit';


//exports
export const resendStart = createAction<string[]>('resend');
