/// <reference path="../Service/DeferredRcpClient.ts" />

namespace Api {
	
	export interface ITestService {
		valueCheck(input: TestInput) : JQueryDeferred<TestData>;
		exceptionMethod(input: TestInput) : JQueryDeferred<TestData>;
		failMethod(input: TestInput) : JQueryDeferred<TestData>;
	}

	export class TestService implements ITestService {

		constructor(private _rcpService: Service.IDeferredRcpClient) { 
		}
		
		public valueCheck(input: TestInput) {
			return this._rcpService.post<TestInput, TestData>(input, "test", "valuecheck");
		}
	
		public exceptionMethod(input: TestInput) {
			return this._rcpService.post<TestInput, TestData>(input, "test", "exceptionmethod");
		}
	
		public failMethod(input: TestInput) {
			return this._rcpService.post<TestInput, TestData>(input, "test", "failmethod");
		}
	}
}