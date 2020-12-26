import React from 'react';

import UserSection from './Sections/UserSection';
import DialogSection from './Sections/DialogSection';


const NickBar: React.FC<{}> = () => {
	return (
		<div>
			<UserSection/>
			<DialogSection/>
		</div>
	);
};

export default NickBar;
