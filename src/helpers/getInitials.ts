export default (name: string) => {
	const words = name.split(/\s+/),
		  firstLetters = words.map((word) => word[0]),
		  initials = firstLetters.join('');

	return initials.toUpperCase();
};
