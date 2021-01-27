import {RefObject, useEffect} from 'react';


const useInterObserver = (root: RefObject<any>, watch: RefObject<any>, fn:
	(entries: IntersectionObserverEntry[]) => void) => {
	useEffect(() => {
		if (!root.current || !watch.current)
			return;

		//create observer
		let observer = new IntersectionObserver(fn, {root: root.current, threshold: 1});

		//connect
		observer.observe(watch.current);

		return () => {
			observer.unobserve(watch.current);
			observer.disconnect();
		};
	}, [root.current, watch.current]);
};

export default useInterObserver;
