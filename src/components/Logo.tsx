import React from 'react';

import logo from '../assets/Logo.png';


const Logo: React.FC<{}> = () => (
	<img
		src={logo} 
		alt="logo"
		style={{height: '40px'}}
	/>
);

export default Logo;

