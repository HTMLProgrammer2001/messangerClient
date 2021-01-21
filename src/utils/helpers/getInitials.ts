export default (name: string) => {
	if(!name)
		return null;

	const words = name.split(/\s+/),
		  firstLetters = words.map((word) => word[0]),
		  initials = firstLetters.join('');

	return initials.toUpperCase().slice(0, 2);
};
