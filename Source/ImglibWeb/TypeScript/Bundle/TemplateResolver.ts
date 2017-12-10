/// <reference path="../ViewModel/ViewModelBase.ts" />

namespace Bundle {

	export interface ITemplateResolver {
		getTemplate<TParam, TViewModel extends ViewModel.ViewModelBase>(template: Bundle.TemplateConfiguration<TParam, TViewModel>, param: TParam): KnockoutTemplate<TViewModel>;
	}

	export class TemplateResolver {

		constructor(private _serviceResolver: Service.IServiceResolver) { }

		public getTemplate<TParam, TViewModel extends ViewModel.ViewModelBase>(template: Bundle.TemplateConfiguration<TParam, TViewModel>, params: TParam): KnockoutTemplate<TViewModel> {
			return {
				name: template.htmlFileName,
				data: template.init(params, this._serviceResolver)
			};
		}
	}
}