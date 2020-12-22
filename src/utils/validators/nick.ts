import * as Yup from 'yup';


const nick = () => {
	return Yup.string().min(4).max(32)
		.matches(/^\w+$/, 'Nick must contains only letters and numbers')
};

export default nick;
