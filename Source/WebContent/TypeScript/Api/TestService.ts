namespace Api {

	export interface ITestService {
		fail(input: TestParamneter): Api.VoidDeferred;
		success(input: TestParamneter): Api.VoidDeferred;
		stuff(intp: TestParamneter): Api.GenericDeferred<TestData>;
		getter(): Api.GenericDeferred<TestData>;
	}

	export class TestService implements ITestService {

		constructor(private _rcpService: Service.IDeferredRcpClient) {	}

		public fail(input: TestParamneter){
			return this._rcpService.put<TestParamneter>(input,  "test", "fail");
		}

		public success(input: TestParamneter){
			return this._rcpService.put<TestParamneter>(input,  "test", "success");
		}

		public stuff(intp: TestParamneter) {
			return this._rcpService.post<TestParamneter, TestData>(intp, "test", "stuff");
		}

		public getter() {
			return this._rcpService.get<TestData>("test", "getter");
		}
	}
}