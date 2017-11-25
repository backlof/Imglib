module Service {
	export class OwenSelfHostingApi implements IApiHost {
		public base = "http://localhost:9000";
		public name = "api";
	}
}