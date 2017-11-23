
class Kernel {

	private _apiHost: IApiHost;
	private _imageService: Api.IImageService;
	private _rcpService: IDeferredRcpClient;
	private _templateResolver: TemplateResolver;

	private static SingletonScope<T>(prop: T, init: () => T) {
		if (!prop) {
			prop = init();
		}
		return prop;
	}

	private static TransientScope<T>(init: () => T) {
		return init();
	}

	constructor() {
		//TODO Remove test below
		this.TemplateResolver.getTemplate(Template.TestBundle, {
			Age: 22
		});
	}

	get ApiHost() {
		return Kernel.SingletonScope(this._apiHost, () => new OwenSelfHostingApi());
	}

	get ImageService() {
		return Kernel.SingletonScope(this._imageService, () => new Api.ImageService(this.RcpClient));
	}

	get RcpClient() {
		return Kernel.SingletonScope(this._rcpService, () => new LocalRcpClient(this.ApiHost));
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