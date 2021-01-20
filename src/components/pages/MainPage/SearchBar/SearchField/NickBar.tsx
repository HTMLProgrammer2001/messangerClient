import React from 'react';

import UserSection from './Sections/UserSection';
import DialogsSection from './Sections/DialogsSection';


const NickBar: React.FC<{}> = () => {
	return (
		<div>
			<UserSection/>
			<DialogsSection/>
		</div>
	);
};

export default NickBar;
