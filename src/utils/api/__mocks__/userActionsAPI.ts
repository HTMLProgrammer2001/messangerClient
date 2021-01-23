const userActionsAPI = {
	changePhone: jest.fn(),
	confirmChangePhone: jest.fn(),
	resendChange: jest.fn(),

	logIn: jest.fn(),
	confirmLogin: jest.fn(),
	resendLogin: jest.fn(),

	signIn: jest.fn(),
	resetSignIn: jest.fn(),
	resendSignIn: jest.fn(),
	confirmSignIn: jest.fn(),

	getMe: jest.fn()
};

export default userActionsAPI;
