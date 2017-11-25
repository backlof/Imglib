/// <reference path = "./../Service/ITemplateResolver.ts" />
/// <reference path = "./../Service/TemplateResolver.ts" />

module Bundle {
	export class ServiceResolver implements IServiceResolver {
		private _templateResolver: Service.ITemplateResolver;
		private _apiHost: Service.IApiHost;

		private Singleton<T>(prop: T, getter: () => T) {
			if (!prop) {
				prop = getter();
			}
			return prop;
		}

		private Transient<T>(getter: () => T) {
			return getter();
		}

		constructor() {
		}

		get TemplateResolver(): Service.ITemplateResolver {
			return this.Singleton(this._templateResolver, () => new Service.TemplateResolver(this));
		}

		get ApiHost(): Service.IApiHost {
			return this.Singleton(this._apiHost, () => new Service.OwenSelfHostingApi());
		}
	}
}