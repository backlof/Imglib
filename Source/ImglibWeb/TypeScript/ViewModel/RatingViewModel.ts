/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface RatingViewModel {
		rating: number;
	}

	export class RatingViewModel extends ViewModelBase {

		private header = ko.observable<string>();

		constructor(param: RatingViewModel) {
			super();

			this.header(`${param.rating} stars`);
		}
	}
}