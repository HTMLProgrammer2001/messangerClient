const mapIdWith = <T>(ids: string | string[], data: Record<string, T>): T | T[] => {
	//check input
	if(!ids)
		return null;

	if(!Array.isArray(ids))
		return data[ids];

	//map data
	return ids.map(id => data[id]);
};

export default mapIdWith;
