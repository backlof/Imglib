module Service {
	export class TemplateResolver {

		constructor(private _serviceResolver: Bundle.IServiceResolver) { }

		public getTemplate<TParam, TViewModel extends ViewModel.KnockoutViewModelBase>(template: Bundle.ITemplateConfiguration<TParam, TViewModel>, params: TParam) {
			const vm = template.make(params, this._serviceResolver);
			return { name: template.name, data: vm };
		}
	}
}