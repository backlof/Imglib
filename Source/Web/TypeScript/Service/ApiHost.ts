namespace Service {
	export interface IApiHost {
		base: string;
		name: string;
	}

	export class OwenSelfHostingApi implements IApiHost {
		public base = "http://localhost:8080";
		public name = "api";
	}
}