/// <reference path="../Bundle/KnockoutComponentRegisterer.ts" />
/// <reference path="../ViewModel/MainViewModel.ts" />
/// <reference path="DeferredRcpClient.ts" />
/// <reference path="ApiHost.ts" />
/// <reference path="../Api/ImageService.ts" />
/// <reference path="Logger.ts" />

namespace Service {

	export interface IServiceResolver {
		readonly ApiHost: Service.IApiHost;
		readonly ComponentResolver: Bundle.IKnockoutComponentRegisterer;
		readonly RcpService: Service.IDeferredRcpClient;
		readonly ImageService: Api.IImageService;
		readonly Logger: Service.ILogger;
		readonly BindingViewModel: ViewModel.ViewModelBase;
		readonly BrowserInvoker: Browser.IBrowserInvoker;
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

		get BrowserInvoker(): Browser.IBrowserInvoker {
			return this.Singleton("BrowserExternal", () => new Browser.BrowserInvoker());
		}

		get ComponentResolver(): Bundle.HtmlScriptInsertKnockoutComponentRegisterer {
			return this.Singleton("ComponentResolver", () => new Bundle.HtmlScriptInsertKnockoutComponentRegisterer(this));
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

		get Logger(): ILogger {
			return this.Singleton("Logger", () => new Service.FooterBarLogger());
		}

		get BindingViewModel(): ViewModel.ViewModelBase {
			return this.Transient(() => new ViewModel.MainViewModel(this.Logger, this.BrowserInvoker));
		}
	}
}