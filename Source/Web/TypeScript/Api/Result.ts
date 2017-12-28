namespace Api {

	export interface Result<T> {
		value: T;
		success: boolean;
	}
}