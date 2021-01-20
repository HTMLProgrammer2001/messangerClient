const dateToString = (time: number | Date): string => {
	let curTime = +(new Date()),
		parsedTime = +(new Date(time)),
		result = '';

	if(curTime - parsedTime <= 1000 * 3600 * 24 && new Date(time).getDay() == new Date(curTime).getDay())
		result = 'Today';

	else if(curTime - parsedTime <= 1000 * 3600 * 24 * 2 &&
		new Date(time).getDay() == new Date(curTime).getDay() - 1)
		result = 'Yesterday';

	else if(curTime - parsedTime <= 1000 * 3600 * 24 * 7) {
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		result = days[new Date(time).getDay()];
	}

	else{
		let date = new Date(time),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate();

		result = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
	}

	return result;
};

export default dateToString;
