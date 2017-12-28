/// <reference path="../Service/ApiHost.ts" />

namespace Service {

	export interface IDeferredRcpClient {
		post<TIn, TOut>(data: TIn, controller: string, action: string): JQueryDeferred<TOut>;
	}

	export class LocalRcpClient implements IDeferredRcpClient {

		constructor(private _host: IApiHost) {
		}

		public post<TIn, TOut>(data: TIn, controller: string, action: string): JQueryDeferred<TOut> {
			const promise = $.Deferred<TOut>();

			this.getPromise<TIn,TOut>(data, controller, action).done((data) => {
				if (data.success)
					promise.resolve(data.value);
				else
					promise.reject();
			}).fail(() => {
				console.error("Ajax call failed");
				promise.reject();
			});

			return promise;
		}

		private getPromise<TIn, TOut>(data: TIn, controller: string, action: string): JQueryPromise<Api.Result<TOut>> {
			return $.ajax({
				url: `${this._host.base}/${this._host.name}/${controller}/${action}`,
				method: "POST",
				data: JSON.stringify(data)
				//dataType: "application/json",
				//contentType: 'application/json; charset=utf-8',
			});

			//REMEMBER JQuery will fail the call if it believes the JSON return object isn't valid
		}
	}
}