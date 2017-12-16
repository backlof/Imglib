/// <reference path="Service/ServiceResolver.ts" />
/// <reference path="Bundle/KnockoutComponentConfiguration.ts" />
/// <reference path="ViewModel/MainViewModel.ts" />

class Application {

	constructor(private _serviceResolver: Service.IServiceResolver) {
		_serviceResolver.ComponentResolver.register(Bundle.getAllComponents()).done(() => {
			ko.applyBindings(_serviceResolver.BindingViewModel);
		}).fail(() => {
			console.error("Couldn't load html templates");
		});
	}
}

$(document).ready(() => {
	const app = new Application(new Service.ServiceResolver());
});

//window.onload = () => {
//	const app = new Application(new Service.ServiceResolver());
//};