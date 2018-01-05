namespace Api {
	export interface VoidDeferred {
		done(callback: () => void): VoidDeferred;
		fail(callback: (error: Api.ErrorCode) => void): VoidDeferred;
		always(callback: () => void): VoidDeferred;
	}
}