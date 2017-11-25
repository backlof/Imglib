module ViewModel {
	export interface ExampleParam {
		id: number;
	}

	export class ExampleViewModel extends ViewModel.KnockoutViewModelBase {
		constructor(param: ExampleParam, private _templateResolver: Service.ITemplateResolver) {
			super();

			var secondModel = this._templateResolver.getTemplate(Bundle.Template.ExampleViewModel, { id: 23 });
		}
	}
}