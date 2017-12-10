namespace Bundle {

	export class TemplateConfiguration<TParam, TViewModel extends ViewModel.ViewModelBase> {
		constructor(public htmlFileName: string, public init: (param: TParam, resolver: Service.IServiceResolver) => TViewModel) { }
	}

	class TemplateConfigurations {
		public Rating = new TemplateConfiguration("rating", (param: ViewModel.RatingViewModel, resolver) => new ViewModel.RatingViewModel(param, resolver.TemplateResolver));
	}

	export var Template = new TemplateConfigurations();

	export var getAllHtmlFileNames = () => {
		return Object.keys(Template).map(key => (Template[key] as TemplateConfiguration<any, any>).htmlFileName);
	}
}