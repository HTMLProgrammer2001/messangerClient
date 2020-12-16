const code = (value: string) => {
	if(value == undefined)
		return undefined;

	return new RegExp('^\\d{8}$').test(value) ? undefined : 'Code must be numeric string with length of 8';
};

export default code;
