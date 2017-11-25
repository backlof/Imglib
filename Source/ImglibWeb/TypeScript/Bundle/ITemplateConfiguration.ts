module Bundle{
	export interface ITemplateConfiguration<TParam, TViewModel extends ViewModel.KnockoutViewModelBase> {
		name: string;
		make(param: TParam, resolver: Bundle.IServiceResolver): TViewModel;
	}
}