import secondsToTime from './secondsToTime';


describe('Test seconds to time function', () => {
	const vals: [number, string][] = [
		[0, '03:00AM'],
		[(3600 + 183) * 1000, '04:03AM'],
		[(3600 * 11 + 300) * 1000, '02:05PM']
	];

	it('Test', () => {
		for(let [time, str] of vals)
			expect(secondsToTime(time)).toBe(str);
	});
});
