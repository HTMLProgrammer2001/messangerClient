import getInitials from './getInitials';


describe('Test get initials function', () => {
	it('Test empty input', () => {
		expect(getInitials('')).toBeNull();
	});

	it('Test initials for names', () => {
		expect(getInitials('Test')).toBe('T');
		expect(getInitials('Yurii Prisyazhnyy')).toBe('YP');
		expect(getInitials('Test in test')).toBe('TI');
	});
});
