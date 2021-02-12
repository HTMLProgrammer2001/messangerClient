import {useState} from 'react';
import axios, {CancelTokenSource} from 'axios';

const useApi = <T extends (...args: any[]) => any>(api: T) => {
	let [isLoading, setLoading] = useState(false),
		cancelSource: CancelTokenSource = null;

	//handlers
	const call = async (...args: Parameters<T>) => {
			if (isLoading)
				return;

			//start loading
			setLoading(true);

			try {
				//make api call
				cancelSource = axios.CancelToken.source();
				await api(...args, cancelSource);

				return null;
			} catch (e) {
				//show error
				return e.response?.data.message || e.message;
			}
			finally {
				//stop loading
				setLoading(false);
			}
		},
		cancel = () => {
			cancelSource?.cancel();
			setLoading(false);
		};

	return {isLoading, call, cancel};
};

export default useApi;
