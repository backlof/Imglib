module Service {
	export interface ITemplateResolver {
		getTemplate<TParam, TViewModel extends ViewModel.KnockoutViewModelBase>(template: Bundle.ITemplateConfiguration<TParam, TViewModel>, param: TParam): Bundle.ITemplate<TViewModel>;
	}
}