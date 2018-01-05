namespace Api {
	export interface GenericDeferred<T> {
		done(callback: (value: T) => void): GenericDeferred<T>;
		fail(callback: (error: Api.ErrorCode) => void): GenericDeferred<T>;
		always(callback: () => void): GenericDeferred<T>;
	}
}