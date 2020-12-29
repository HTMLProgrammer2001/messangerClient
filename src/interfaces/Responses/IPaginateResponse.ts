export type IPaginateResponse<T> = {
	message: string,
	data: T[],
	totalPages: number,
	total: number,
	pageSize: number,
	page: number
}
