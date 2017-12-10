/// <reference path="../Service/ApiHost.ts" />

namespace Service {

	export interface IDeferredRcpClient {
		post<TIn, TOut>(data: TIn, controller: string, method: string): JQueryDeferred<TOut>;
		get<TIn>(data: TIn, controller: string, method: string): JQueryDeferred<void>;
	}

	export class LocalRcpClient implements IDeferredRcpClient {

		constructor(private _host: IApiHost) {
		}

		private getActionUrl(controller: string, action: string) {
			return `${this._host.base}/${this._host.name}/${controller}/${action}`;
		}

		public post<TIn, TOut>(data: TIn, controller: string, action: string): JQueryDeferred<TOut> {
			const promise = $.Deferred<TOut>();

			$.ajax({
				url: this.getActionUrl(controller, action),
				method: "POST",
				data: JSON.stringify(data),
				dataType: "application/json"
			}).done((data) => {
				promise.resolve(data);
			}).fail(() => {
				promise.reject();
			});

			return promise;
		}

		public get<TIn>(data: TIn, controller: string, action: string): JQueryDeferred<void> {
			const promise = $.Deferred<void>();

			$.ajax({
				url: this.getActionUrl(controller, action),
				method: "GET",
				data: JSON.stringify(data),
				dataType: "application/json"
			}).done(() => {
				promise.resolve();
			}).fail(() => {
				promise.reject();
			});

			return promise as JQueryDeferred<void>;
		}
	}
}