import React from 'react';

import Chat from './Chat';
import MessagePart from './MessagePart';


const WithChat: React.FC<{}> = () => (
	<div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
		<Chat/>
		<MessagePart/>
	</div>
);

export default WithChat;
