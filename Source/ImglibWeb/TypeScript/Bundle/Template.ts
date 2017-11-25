module Bundle {
	export class Template {
		public static ExampleViewModel = new TemplateConfiguration("example", (param: ViewModel.ExampleParam, resolver) => new ViewModel.ExampleViewModel(param, resolver.TemplateResolver));
	}
}