namespace Service {

	export interface IDeferredRcpClient {
		post<TIn, TOut>(arg: TIn, controller: string, action: string): Api.GenericDeferred<TOut>;
		put<TIn>(arg: TIn, controller: string, action: string): Api.VoidDeferred;
		get<TOut>(controller: string, action: string): Api.GenericDeferred<TOut>;
	}

	export interface IJQueryXhr {
		status: Api.ErrorCode;
	}

	export class LocalRcpClient implements IDeferredRcpClient {

		constructor(private _host: IApiHost) { }

		public post<TIn, TOut>(arg: TIn, controller: string, action: string): Api.GenericDeferred<TOut> {
			const promise = $.Deferred<TOut>();
			this.getPromise<TIn, Api.GenericResult<TOut>>(arg, controller, action).done((result) => {
				if (result.success)
					promise.resolve(result.value);
				else
					promise.reject(result.error);
			}).fail((xhr: IJQueryXhr) => {
				promise.reject(xhr.status);
			});

			return promise as Api.GenericDeferred<TOut>;
		}

		public put<TIn>(arg: TIn, controller: string, action: string): Api.VoidDeferred {
			const promise = $.Deferred<void>();

			this.getPromise<TIn, Api.VoidResult>(arg, controller, action).done((result) => {
				if (result.success)
					promise.resolve();
				else
					promise.reject(result.error);
			}).fail((xhr: IJQueryXhr) => {
				promise.reject(xhr.status);
			});

			return promise as Api.VoidDeferred;
		}

		public get<TOut>(controller: string, action: string): Api.GenericDeferred<TOut> {
			const promise = $.Deferred<TOut>();

			this.getPromise<Api.EmptyParameter, Api.GenericResult<TOut>>({}, controller, action).done((result) => {
				if (result.success)
					promise.resolve(result.value);
				else
					promise.reject(result.error);
			}).fail((xhr: IJQueryXhr) => {
				promise.reject(xhr.status);
			});

			return promise as Api.GenericDeferred<TOut>;
		}

		private getPromise<TIn, TOut>(arg: TIn, controller: string, action: string): JQueryPromise<TOut> {
			//REMEMBER JQuery will fail the call if it believes the JSON return object isn't valid
			return $.ajax({
				url: `${this._host.base}/${this._host.name}/${controller}/${action}`,
				method: "POST",
				data: arg,
				dataType: "json"
			});
		}
	}
}