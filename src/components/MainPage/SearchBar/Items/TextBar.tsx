import React from 'react';

import DialogSection from './Sections/DialogSection';
import MessageSection from './Sections/MessageSection';


const TextBar: React.FC<{}> = () => {
	return (
		<div>
			<DialogSection/>
			<MessageSection/>
		</div>
	);
};

export default TextBar;
