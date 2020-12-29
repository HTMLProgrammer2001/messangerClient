import React from 'react';

import Chat from './Chat';
import MessagePart from './MessagePart';


const WithChat: React.FC<{}> = () => (
	<div>
		<Chat/>
		<MessagePart/>
	</div>
);

export default WithChat;
