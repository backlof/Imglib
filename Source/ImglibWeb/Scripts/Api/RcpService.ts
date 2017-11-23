
class RcpService implements IRcpService {

	private static readonly HostAddress = "http://localhost:9000";
	private static readonly ApiName = "api";

	constructor() {



	}

	private getUrl(controller: string, method: string) {
		return `${RcpService.HostAddress}/${RcpService.ApiName}/${controller}/${method}`;
	}

	public post<TIn, TOut>(data: TIn, controller: string, method: string): JQueryDeferred<TOut> {
		const promise = $.Deferred<TOut>();

		$.ajax({
			url: this.getUrl(controller, method),
			method: "POST",
			data: data,
			dataType: "application/json"
		}).done((data) => {
			promise.resolve(data);
		}).fail(() => {
			promise.reject();
		});

		return promise;
	}

	public get<TIn>(data: TIn, controller: string, method: string): JQueryDeferred<void> {
		const promise = $.Deferred<void>();

		$.ajax({
			url: this.getUrl(controller, method),
			method: "GET",
			data: data,
			dataType: "application/json"
		}).done(() => {
			promise.resolve();
		}).fail(() => {
			promise.reject();
		});

		return promise as JQueryDeferred<void>;
	}
}