namespace Bundle {

	export class KnockoutGenericComponentConfiguration<TParam, TViewModel extends ViewModel.ViewModelBase> {
		constructor(public name: string, public init: (param: TParam, resolver: Service.IServiceResolver) => TViewModel) { }
	}

	export declare type KnockoutComponentConfiguration = KnockoutGenericComponentConfiguration<any, any>;

	class KnockoutComponentConfigurations {
		public Rated = new KnockoutGenericComponentConfiguration("rated", (param: ViewModel.IRatedViewModelParams, resolver) => new ViewModel.RatedViewModel(param, resolver.ImageService));
		public Test = new KnockoutGenericComponentConfiguration("test", (param: ViewModel.ITestViewModelParams, resolver) => new ViewModel.TestViewModel(param));
		public Rating = new KnockoutGenericComponentConfiguration("rating", (param: ViewModel.IRatingViewModelParams, resolver) => new ViewModel.RatingViewModel(param, resolver.ImageService));
		public Tags = new KnockoutGenericComponentConfiguration("tags", (param: ViewModel.ITagsViewModelParams, resolver) => new ViewModel.TagsViewModel(param));
		public Tag = new KnockoutGenericComponentConfiguration("tag", (param: ViewModel.ITagViewModelParams, resolver) => new ViewModel.TagViewModel(param));
	}

	export var Component = new KnockoutComponentConfigurations();

	export var getAllComponents = () => {
		return Object.keys(Component).map(key => (Component[key] as KnockoutComponentConfiguration));
	};

	export var getComponent = <TParam, TViewModel extends ViewModel.ViewModelBase>(configuartion: Bundle.KnockoutGenericComponentConfiguration<TParam, TViewModel>, params: TParam) => {
		return {
			name: configuartion.name,
			params: params
		} as KnockoutGenericComponent<TParam>;
	};
}