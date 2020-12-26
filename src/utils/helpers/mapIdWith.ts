const mapIdWith = <T>(ids: string | string[], data: Record<string, T>): T | T[] => {
	if(!ids)
		return null;

	if(!Array.isArray(ids))
		return data[ids];

	return ids.map(id => data[id]);
};

export default mapIdWith;
