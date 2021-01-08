const secondsToDuration = (val: number) => {
	const secs = Math.floor(val % 60),
		mins = Math.floor(((val - secs)/60) % 60),
		hours = Math.floor(((val - mins * 60 - secs)/1440) % 24);

	return `${hours < 10 ? '0':''}${hours}:${mins < 10 ? '0':''}${mins}:${secs < 10 ? '0':''}${secs}`;
};

export default secondsToDuration;
