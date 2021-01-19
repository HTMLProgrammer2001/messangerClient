import {useEffect, useLayoutEffect, useRef, useState} from 'react';


const useAdaptive = () => {
	const ref = useRef<any>(null),
		[width, setWidth] = useState(null),
		[loaded, setLoaded] = useState(false);

	useEffect(() => {
		const onLoad = () => setLoaded(true);

		if(ref.current) {
			ref.current.addEventListener('load', onLoad);
			ref.current.addEventListener('loadeddata', onLoad);
		}

		return () => {
			ref.current.removeEventListener('load', onLoad);
			ref.current.removeEventListener('loadeddata', onLoad);
		}
	}, [ref.current]);

	useLayoutEffect(() => {
		const onResize = () => {
			if(ref.current && loaded)
				setWidth(ref.current.width || ref.current.clientWidth);
		};

		window.addEventListener('resize', onResize);
		onResize();

		return () => window.removeEventListener('resize', onResize);
	}, [loaded]);

	return {width, ref};
};

export default useAdaptive;
