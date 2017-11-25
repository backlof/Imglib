module Bundle {
	export class TemplateConfiguration<TParam, TViewModel extends ViewModel.KnockoutViewModelBase> implements Bundle.ITemplateConfiguration<TParam, TViewModel>{
		constructor(public name: string, public make: (param: TParam, resolver: Bundle.ServiceResolver) => TViewModel) { }
	}
}