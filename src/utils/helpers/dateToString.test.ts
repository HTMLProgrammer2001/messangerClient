import dateToString from './dateToString';


describe('Test date to string function', () => {
	let startDayTime = new Date();
	startDayTime.setHours(0);
	startDayTime.setMinutes(0);
	startDayTime.setSeconds(0);

	it('Test today', () => {
		expect(dateToString(new Date())).toBe('Today');
		expect(dateToString(startDayTime)).toBe('Today');
	});

	it('Test yesterday', () => {
		expect(dateToString(+new Date() - 24 * 3600 * 1000)).toBe('Yesterday');
		expect(dateToString(+startDayTime - 24 * 3600 * 1000)).toBe('Yesterday');
	});

	it('Test full date', () => {
		expect(dateToString(new Date(0))).toBe('1970-01-01');
	});

	it('Test week day', () => {
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const minusDay = 2,
			day = (startDayTime.getDay() - minusDay + 7) % 7;

		expect(dateToString(+startDayTime - minusDay * 24 * 3600 * 1000)).toBe(days[day]);
	});
});
