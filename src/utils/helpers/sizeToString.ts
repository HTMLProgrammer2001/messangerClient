const sizeToString = (size: number) => {
	if(!size)
		return 0;

	let points = ['b', 'Kb', 'Mb', 'Gb'],
		index = 0;

	while (size >= 900){
		size /= 1024;
		index++;
	}

	const roundedSize = Math.round(size * 10) / 10;
	return `${roundedSize}${points[index]}`;
};

export default sizeToString;
