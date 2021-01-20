import React, {useContext} from 'react';

import PopUpContext from '../../utils/context/PopUpContext';


const ClosePopUp: React.FC = () => {
	const {setElement} = useContext(PopUpContext),
		handler = () => setElement(null);

	return <div onClick={handler} style={{marginLeft: '1.5rem', cursor: 'pointer'}}>Close</div>;
};

export default ClosePopUp;
