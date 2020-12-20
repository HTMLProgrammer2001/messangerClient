import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../assets/Logo.png';


const Logo: React.FC<{}> = () => (
	<Link to="/">
		<img
			src={logo}
			alt="logo"
			style={{height: '40px'}}
		/>
	</Link>
);

export default Logo;
