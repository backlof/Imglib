/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface ITestViewModelParams {

	}

	export class TestViewModel extends ViewModelBase {
		constructor(param: ITestViewModelParams) {
			super();
		}
	}
}