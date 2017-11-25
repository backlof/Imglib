/// <reference path = "./../Service/ITemplateResolver.ts" />

module Bundle {
	export interface IServiceResolver {
		readonly ApiHost: Service.IApiHost;
		readonly TemplateResolver: Service.ITemplateResolver;
	}
}