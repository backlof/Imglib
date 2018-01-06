namespace Api {

	export interface GenericResult<T> {
		value: T;
		success: boolean;
		error: ErrorCode;
	}
}