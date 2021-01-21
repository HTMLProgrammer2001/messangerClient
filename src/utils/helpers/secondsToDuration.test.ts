import secondsToDuration from './secondsToDuration';


describe('Test seconds to duration function', () => {
	it('Test null on incorrect input', () => {
		expect(secondsToDuration(undefined)).toBeNull();
		expect(secondsToDuration('test' as any)).toBeNull();
		expect(secondsToDuration(-10)).toBeNull();
	});

	it('Test seconds parse', () => {
		expect(secondsToDuration(10)).toBe('00:00:10');
		expect(secondsToDuration(35)).toBe('00:00:35');
	});

	it('Test minutes parse', () => {
		expect(secondsToDuration(80)).toBe('00:01:20');
		expect(secondsToDuration(3500)).toBe('00:58:20');
	});

	it('Test hours parse', () => {
		expect(secondsToDuration(3900)).toBe('01:05:00');
		expect(secondsToDuration(3920)).toBe('01:05:20');
		expect(secondsToDuration(7210)).toBe('02:00:10');
	});
});
