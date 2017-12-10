/// <reference path="../Bundle/TemplateResolver.ts" />
/// <reference path="../ViewModel/MainViewModel.ts" />
/// <reference path="DeferredRcpClient.ts" />
/// <reference path="ApiHost.ts" />
/// <reference path="../Api/ImageService.ts" />

namespace Service {

	export interface IServiceResolver {
		readonly ApiHost: Service.IApiHost;
		readonly TemplateResolver: Bundle.ITemplateResolver;
		readonly RcpService: Service.IDeferredRcpClient;
		readonly ImageService: Api.IImageService;
		readonly HtmlScriptInserter: Service.IHtmlScriptInserter;
	}

	export class ServiceResolver implements IServiceResolver {
		private _singletons = {};

		private Singleton<T>(name: string, getter: () => T) {
			if (!this._singletons[name]) {
				this._singletons[name] = getter();
			}
			return this._singletons[name];
		}

		private Transient<T>(getter: () => T) {
			return getter();
		}

		constructor() {
		}

		get TemplateResolver(): Bundle.ITemplateResolver {
			return this.Singleton("TemplateResolver", () => new Bundle.TemplateResolver(this));
		}

		get ApiHost(): Service.IApiHost {
			return this.Singleton("ApiHost", () => new Service.OwenSelfHostingApi());
		}

		get RcpService(): Service.IDeferredRcpClient {
			return this.Singleton("RcpService", () => new Service.LocalRcpClient(this.ApiHost));
		}

		get ImageService(): Api.IImageService {
			return this.Singleton("ImageService", () => new Api.ImageService(this.RcpService));
		}

		get HtmlScriptInserter(): Service.IHtmlScriptInserter {
			return this.Singleton("HtmlScriptInserter", () => new Service.LocalWebDirectoryHtmlInserter());
		}
	}
}