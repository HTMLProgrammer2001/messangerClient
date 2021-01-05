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
		switch (new Date(time).getDay()) {
			case 0:
				result = 'Sunday';
				break;

			case 1:
				result = 'Monday';
				break;

			case 2:
				result = 'Tuesday';
				break;

			case 3:
				result = 'Wednesday';
				break;

			case 4:
				result = 'Thursday';
				break;

			case 5:
				result = 'Friday';
				break;

			case 6:
				result = 'Saturday';
				break;
		}
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
