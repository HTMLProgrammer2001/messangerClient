const throttle = (fn: Function, time: number) => {
	let timer = null;

	return (...args: any[]) => {
		if(timer)
			return;

		fn(...args);
		timer = setTimeout(() => timer = null, time);
	};
};

export default throttle;
