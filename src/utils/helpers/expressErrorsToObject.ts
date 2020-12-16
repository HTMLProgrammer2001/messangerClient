type IExpressErrors = Array<{value: any, msg: string, param: string, location: string}>;

const expressErrorsToObject = (expressErrors: IExpressErrors = []) => {
	const errors: any = {};

	//convert express errors to object of errors
	expressErrors.forEach((expressError) => errors[expressError.param] = expressError.msg);
	return errors;
};

export default expressErrorsToObject;
