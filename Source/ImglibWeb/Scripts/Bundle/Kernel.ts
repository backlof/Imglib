
class Kernel {

	private _imageService: Api.IImageService;
	private _rcpService: IRcpService;
	private _templateResolver: TemplateResolver;

	private static SingletonScope<T>(prop: T, setter: () => T) {
		if (!prop) {
			prop = setter();
		}
		return prop;
	}

	private static TransientScope<T>(getter: () => T) {
		return getter();
	}

	constructor() {
		//TODO Remove test below
		this.TemplateResolver.getTemplate(Template.TestBundle, {
			Age: 22
		});
	}

	get ImageService() {
		return Kernel.SingletonScope(this._imageService, () => new Api.ImageService(this.RcpService));
	}

	get RcpService() {
		return Kernel.SingletonScope(this._rcpService, () => new RcpService());
	}

	get TemplateResolver() {
		return Kernel.SingletonScope(this._templateResolver, () => new TemplateResolver(this));
	}
}

class KnockoutViewModelBase<TParam>  {
	// Knockout-stuff
	// Dispose

	protected readonly params: TParam;

	constructor(params: TParam) {
		this.params = params;
	}

	private dispose() {
		// Dispose of computeds
	}
}

interface ExampleParam {
	Age: number;
}

class ExampleViewModel extends KnockoutViewModelBase<ExampleParam>{

	constructor(_imageService: Api.IImageService, params: ExampleParam) {
		super(params);
	}
}

class TemplateBundle<TParam> {
	constructor(public html: string, public resolve: (params: TParam, kernel: Kernel) => KnockoutViewModelBase<TParam>) {

	}
}

class Template {
	public static readonly TestBundle = new TemplateBundle("template", (params: ExampleParam, kernel) => new ExampleViewModel(kernel.ImageService, params));
}

class TemplateResolver {

	constructor(private _kernel: Kernel) {

	}

	public getTemplate<TParam>(template: TemplateBundle<TParam>, params: TParam) {
		const vm = template.resolve(params, this._kernel);
		return { name: template.html, data: vm };
	}
}