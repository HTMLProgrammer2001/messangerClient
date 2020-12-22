import * as Yup from 'yup';


const phone = (msg = 'Incorrect phone format') => {
	return Yup.string().matches(/\+?\d{7,}/, msg);
};

export default phone;
