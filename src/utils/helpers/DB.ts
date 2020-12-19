class DB{
	constructor(private DBName: string){}

	getAll(){
		const data = localStorage.getItem(this.DBName);

		if(!data)
			return;

		const jsonData: {[key: string]: any} = JSON.parse(data);
		return jsonData;
	}

	getData<T = any>(field: string): T{
		const allData = this.getAll();
		return allData ? allData[field] as T : null;
	}

	setData(field: string, data: any){
		const allData = this.getAll() || {};

		allData[field] = data;
		localStorage.setItem(this.DBName, JSON.stringify(allData));
	}
}

export default new DB('settings');
