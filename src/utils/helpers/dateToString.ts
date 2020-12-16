const dateToString = (time: number): string => {
	let curTime = +(new Date()),
		result = '';

	if(curTime - time <= 1000 * 3600 * 24 && new Date(time).getDay() == new Date(curTime).getDay())
		result = 'Today';

	else if(curTime - time <= 1000 * 3600 * 24 * 2 && new Date(time).getDay() == new Date(curTime).getDay() - 1)
		result = 'Yesterday';

	else if(curTime - time <= 1000 * 3600 * 24 * 7) {
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
		result = new Date(time).toLocaleDateString();
	}

	return result;
};

export default dateToString;
