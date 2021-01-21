const secondsToDuration = (val: number) => {
	//validate input
	if(isNaN(val) || val < 0)
		return null;

	const secs = Math.floor(val % 60),
		mins = Math.floor(((val - secs)/60) % 60),
		hours = Math.floor((val - mins * 60 - secs)/3600);

	return `${hours < 10 ? '0':''}${hours}:${mins < 10 ? '0':''}${mins}:${secs < 10 ? '0':''}${secs}`;
};

export default secondsToDuration;
