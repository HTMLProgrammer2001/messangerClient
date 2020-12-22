import * as Yup from 'yup';


const code = (msg = 'Incorrect code') => {
	return Yup.string().length(8).matches(/^\d+$/, msg);
};

export default code;
