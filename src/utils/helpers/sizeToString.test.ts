import sizeToString from './sizeToString';


describe('Test size to string function', () => {
	it('Test null size', () => {
		expect(sizeToString(null)).toBe(0);
	});

	it('Test bites', () => {
		expect(sizeToString(100)).toBe('100b');
		expect(sizeToString(950)).toBe('0.9Kb');
		expect(sizeToString(1020)).toBe('1Kb');
	});

	it('Test kilo bites', () => {
		expect(sizeToString(1024 * 100)).toBe('100Kb');
		expect(sizeToString(1024 * 950)).toBe('0.9Mb');
		expect(sizeToString(1024 * 1020)).toBe('1Mb');
	});

	it('Test giga bites', () => {
		expect(sizeToString(1024 * 1024 * 100)).toBe('100Mb');
		expect(sizeToString(1024 * 1024 * 950)).toBe('0.9Gb');
		expect(sizeToString(1024 * 1024 * 1020)).toBe('1Gb');
	});
});
