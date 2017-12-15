namespace Bundle {

	export class KnockoutGenericComponentConfiguration<TParam, TViewModel extends ViewModel.ViewModelBase> {
		constructor(public name: string, public init: (param: TParam, resolver: Service.IServiceResolver) => TViewModel) { }
	}

	export declare type KnockoutComponentConfiguration = KnockoutGenericComponentConfiguration<any, any>;

	class KnockoutComponentConfigurations {
		public Rating = new KnockoutGenericComponentConfiguration("rating", (param: ViewModel.RatingViewModel, resolver) => new ViewModel.RatingViewModel(param));
		public Test = new KnockoutGenericComponentConfiguration("test", (param: ViewModel.TestViewModelParams, resolver) => new ViewModel.TestViewModel(param));
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