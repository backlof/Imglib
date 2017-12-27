/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface IRatedViewModelParams {
		rating: number;
	}

	export class RatedViewModel extends ViewModelBase {

		private header = ko.observable<string>();

		constructor(param: IRatedViewModelParams) {
			super();

			this.header(`${param.rating} stars`);
		}
	}
}