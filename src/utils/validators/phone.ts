export default (value: string) => {
	if(value == undefined)
		return undefined;

	return new RegExp('^\\+?\\d{5,}$', 'i').test(value) ?
		undefined :
		'Enter valid phone number';
};
