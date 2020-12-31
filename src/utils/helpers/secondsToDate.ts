const secondsToDate = (secs: number) => {
	let date = new Date(secs),
		hours: string|number = date.getHours() % 12,
		minutes: string|number = date.getMinutes(),
		zone = date.getHours() > 12 ? 'PM' : 'AM';

	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${hours}:${minutes}${zone}`;
};

export default secondsToDate;
