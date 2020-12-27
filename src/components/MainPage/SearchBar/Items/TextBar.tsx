import React from 'react';

import DialogsSection from './Sections/DialogsSection';
import MessagesSection from './Sections/MessagesSection';


const TextBar: React.FC<{}> = () => {
	return (
		<div>
			<DialogsSection/>
			<MessagesSection/>
		</div>
	);
};

export default TextBar;
