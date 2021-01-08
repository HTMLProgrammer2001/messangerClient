import {useState, useCallback} from 'react';
import axios from 'axios';


const useDownload = () => {
	const [isLoading, setLoading] = useState(false),
		[error, setError] = useState(''),
		[lastBlob, setBlob] = useState<Blob>(null),
		[lastURL, setURL] = useState(''),
		[progress, setProgress] = useState(0);

	const download = useCallback(async (url: string, name: string) => {
		if(isLoading)
			return;

		//start loading
		setLoading(true);
		setError(null);
		setProgress(0);

		let blob = lastURL == url ? lastBlob : null;

		if(!blob) {
			try {
				//make api call
				const resp = await axios.get(url, {
					responseType: 'blob',
					onDownloadProgress: e => {
						setProgress(e.loaded);
					}
				});

				blob = new Blob([resp.data]);
			}
			catch (e) {
				setError(e.response?.data.message || e.message);
				setLoading(false);
				return;
			}
		}

		const fileURL = URL.createObjectURL(blob);

		//create link
		const a = document.createElement('a');
		a.href = fileURL;
		a.download = name;

		//download
		document.body.appendChild(a);
		a.click();

		//update state
		setLoading(false);
		setBlob(blob);
		setURL(url);
	}, [isLoading, error]);

	return {isLoading, error, download, progress};
};

export default useDownload;
