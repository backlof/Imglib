/// <reference path="Service/ServiceResolver.ts" />
/// <reference path="Bundle/TemplateConfiguration.ts" />
/// <reference path="ViewModel/MainViewModel.ts" />

class Application {

	constructor(private _serviceResolver: Service.IServiceResolver) {
		this.loadScripts().done(() => {
			ko.applyBindings(new ViewModel.MainViewModel(this._serviceResolver.TemplateResolver));
		}).fail(() => {
			console.error("Couldn't load html templates");
		});
	}

	private loadScripts() {
		return this._serviceResolver.HtmlScriptInserter.loadScripts(Bundle.getAllHtmlFileNames());
	}
}

//$(document).ready(() => {});
window.onload = () => {
	const app = new Application(new Service.ServiceResolver());
};