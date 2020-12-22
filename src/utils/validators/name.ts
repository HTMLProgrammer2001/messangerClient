import * as Yup from 'yup';


const name = () => {
	return Yup.string().min(4).max(32)
		.matches(/^\p{Alpha}+[\s\p{Alpha}]+\p{Alpha}+$/u,
			'Name must contains only letters and start/end without spaces')
};

export default name;
